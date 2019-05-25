import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import { stat } from 'fs';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                imageUrl:
                    "https://cdn.shopify.com/s/files/1/0882/1686/products/Times_Square_New_York_City_c0761858-c9cf-4d99-9363-446124ed161f_large.jpg?v=1498541105",
                id: "asd",
                title: "Meetup in NY",
                date: new Date(),
                location: 'New York',
                description: 'ASasdasdas'
            },
            {
                imageUrl:
                    "https://europeanbusinessmagazine.com/wp-content/uploads/2017/07/paris.jpg",
                id: "qwe",
                title: "Meetup in Paris",
                date: new Date()
                ,
                location: 'Paris',
                description: 'ASasdasdas'
            }
        ],
        user: null,
        loading: false,
        authError: null,
        error: null,
        createdMeetupKey: ""
    },
    mutations: {
        registerUserForMeetup(state, payload) {
            const id = payload.id
            if(state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
                return
            }
            state.user.registeredMeetups.push(id)
            state.user.fbKeys[id] = payload.fbKey
        },
        unregisterUserFromMeetup(state, payload) {
            const registeredMeetups = state.user.registeredMeetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        },
        updateMeetup(state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if (payload.title) {
                meetup.title = payload.title
            }
            if (payload.description) {
                meetup.description = payload.description
            }
            if (payload.date) {
                meetup.date = payload.date
            }
        },
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        },
        setCreatedMeetupKey(state, payload) {
            state.createdMeetupKey = payload
        }
    },
    actions: {
        
        registerUserForMeetup({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registrations/')
            .push(payload)
            .then((data) => {
                commit('setLoading', false)
                commit('registerUserForMeetup', {id: payload, fbKey: data.key})
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
               
            })
        },
        unregisterUserFromMeetup({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            if(!user.fbKeys) {
                return
            }
            const fbKey = user.fbKeys[payload]
            firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
            .remove()
            .then(() => {
                commit('setLoading', false)
                commit('unregisterUserFromMeetup', payload)
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        loadMeetups({ commit }) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then(
                    (data) => {
                        const meetups = []
                        const obj = data.val()
                        for (let key in obj) {
                            meetups.push({
                                id: key,
                                title: obj[key].title,
                                description: obj[key].description,
                                imageUrl: obj[key].imageUrl,
                                date: obj[key].date,
                                location: obj[key].location,
                                creatorId: obj[key].creatorId,
                                creatorEmail: obj[key].creatorEmail,
                                listOfUsers: obj[key].listOfUsers
                            })
                        }

                        commit('setLoadedMeetups', meetups)
                        commit('setLoading', false)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                        commit('setLoading', true)
                    }
                )
        },
        createMeetup({ commit, getters }, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.user.id,
                creatorEmail: getters.user.email,
                listOfUsers: payload.listOfUsers
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    return data.key
                })
                .then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    commit('setCreatedMeetupKey', key)
                    return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
                })
                .then(fileData => {
                    let fullPath = fileData.metadata.fullPath
                    return firebase.storage().ref(fullPath).getDownloadURL()
                })
                .then(URL => {
                    imageUrl = URL
                    key = getters.createdMeetupKey
                    // imageUrl = fileData.metadata.downloadURLs[0]
                    return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl })
                })
                .then(() => {
                    commit('createMeetup', {
                        ...meetup,
                        imageUrl: imageUrl,
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })

        },
        registerEvent({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            updateObj.listOfUsers = []
            if(payload) {
                updateObj.listOfUsers.push(payload)
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
            .then(() => {
                commit('setLoading', false)
                commit('registerEvent', payload)
            })
            .catch(error => {
                console.log(error)
            })
        },
        updateMeetupData({ commit }, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
                .then(() => {
                    commit('setLoading', false)
                    commit('updateMeetup', payload)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        signUserUp({ commit }, payload) {
            commit('setLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.user.uid,
                            registeredMeetups: [],
                            fbKeys: {}
                        }

                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        logUserIn({ commit }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.user.uid,
                            registeredMeetups: [],
                            fbKeys: {}
                        }

                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        setUser({ commit }, payload) {
            commit('setUser', payload)
        },
        clearError({ commit }) {
            commit('clearError')
        },
        logout({ commit }) {
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id == meetupId
                })
            }
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        },
        createdMeetupKey(state) {
            return state.createdMeetupKey
        }
    }
})