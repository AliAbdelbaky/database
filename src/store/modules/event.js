import EventService from "@/core/services/EventService"
import {
    defineStore
} from 'pinia'
// export default {
//     namespaced: true,
//     state: {
//         events: [],
//         event: null,
//         EventsCount: 0,
//         perPage: 3
//     },
//     mutations: {
//         SET_EVENTS(state, events) {
//             state.events = events
//         },
//         SET_EVENTS_COUNT(state, count) {
//             state.EventsCount = count
//         },
//         SET_SINGLE_EVENT(state, event) {
//             state.event = event
//         },
//         ADD_EVENT(state, event) {
//             state.events.push(event)
//         }
//     },
//     actions: {
//         fetchEvents({
//             commit,
//             state
//         }, page) {
//             return EventService.getEvents(state.perPage, page)
//                 .then(res => {
//                     commit('SET_EVENTS', res.data)
//                     commit('SET_EVENTS_COUNT', parseInt(res.headers['x-total-count']))
//                 }).catch(err => console.log(err))
//         },
//         getSingleEvent({
//             commit,
//             getters,
//             state
//         }, id) {
//             let event = getters.getEventById(id)
//             if (id == state.event?.id) {
//                 return state.event
//             } else if (event) {
//                 commit('SET_SINGLE_EVENT', event)
//                 return event
//             } else {
//                 return EventService.getEvent(id)
//                     .then(res => {
//                         commit('SET_SINGLE_EVENT', res.data)
//                     }).catch(err => console.log(err))
//             }
//         },
//         createEvent({
//             commit
//         }, eventData) {
//             return EventService.postEvent(eventData)
//                 .then(() => {
//                     commit('ADD_EVENT', eventData)
//                 }).catch(err => console.log(err))
//         }
//     },
//     getters: {
//         getEventById: state => id => {
//             return state.events.find(item => item.id == id)
//         }
//     },
//     modules: {},
// }
export default defineStore('eventStore', {
    state: () => ({
        events: [],
        event: null,
        EventsCount: 0,
        perPage: 3
    }),
    getters: {
        getEventById: state => id => {
            return state.events.find(item => item.id == id)
        }
    },
    actions: {
        fetchEvents(page) {
            return EventService.getEvents(this.perPage, page)
                .then(res => {
                    this.events = res.data;
                    this.EventsCount = parseInt(res.headers['x-total-count'])
                }).catch(err => console.log(err))
        },
        async getSingleEvent(id) {
            //set event frrom getters
            let event = await this.getEventById(id)
            //--
            if (id == this.event?.id) {
                return this.event
            } else if (event?.id == id) {
                console.log('working', event)
                return event
            } else {
                return EventService.getEvent(id)
                    .then(res => {
                        this.event = res.data
                    }).catch(err => console.log(err))
            }
        },
        createEvent(eventData) {
            return EventService.postEvent(eventData)
                .then(() => {
                    this.events.push(eventData)
                }).catch(err => console.log(err))
        }
    }
});