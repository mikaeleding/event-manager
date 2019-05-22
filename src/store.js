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
                date: '2019-01-02'
            },
            {
                imageUrl:
                    "https://europeanbusinessmagazine.com/wp-content/uploads/2017/07/paris.jpg",
                id: "qwe",
                title: "Meetup in Paris",
                date: '2019-01-02'
            }
        ],
        user: {
            id: 'asd1231',
            registeredMeetups: ['qwe']
        }
    },
    mutations: {},
    actions: {},
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