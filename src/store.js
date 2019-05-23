import Vue from 'vue'
import Vuex from 'vuex'

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
        user: {
            id: 'asd1231',
            registeredMeetups: ['qwe']
        }
    },
    mutations: {
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        }
    },
    actions: {
        createMeetup({ commit }, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 'asd1213'
            }
            commit('createMeetup', meetup)
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
        }
    }
})