import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
        error: null
    },
    mutations: {
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
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
        }
    },
    actions: {
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
                                creatorId: obj[key].creatorId,
                                creatorEmail: obj[key].creatorEmail
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
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.user.id,
                creatorEmail: getters.user.email
            }
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    const key = data.key
                    console.log(data)
                    commit('createMeetup', {
                        ...meetup,
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
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
                            registeredMeetups: []
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
                            registeredMeetups: []
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
        }
    }
})