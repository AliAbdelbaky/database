import EventService from "@/core/services/EventService"
export default {
    namespaced: true,
    state: {
        events: [],
        event: null,
        EventsCount: 0,
        perPage: 3
    },
    mutations: {
        SET_EVENTS(state, events) {
            state.events = events
        },
        SET_EVENTS_COUNT(state, count) {
            state.EventsCount = count
        },
        SET_SINGLE_EVENT(state, event) {
            state.event = event
        },
        ADD_EVENT(state, event) {
            state.events.push(event)
        }
    },
    actions: {
        fetchEvents({
            commit,
            state
        }, page) {
            return EventService.getEvents(state.perPage, page)
                .then(res => {
                    commit('SET_EVENTS', res.data)
                    commit('SET_EVENTS_COUNT', parseInt(res.headers['x-total-count']))
                }).catch(err => console.log(err))
        },
        getSingleEvent({
            commit,
            getters,
            state
        }, id) {
            let event = getters.getEventById(id)
            if (id == state.event?.id) {
                return state.event
            } else if (event) {
                commit('SET_SINGLE_EVENT', event)
                return event
            } else {
                return EventService.getEvent(id)
                    .then(res => {
                        commit('SET_SINGLE_EVENT', res.data)
                    }).catch(err => console.log(err))
            }
        },
        createEvent({
            commit
        }, eventData) {
            return EventService.postEvent(eventData)
                .then(() => {
                    commit('ADD_EVENT', eventData)
                }).catch(err => console.log(err))
        }
    },
    getters: {
        getEventById: state => id => {
            return state.events.find(item => item.id == id)
        }
    },
    modules: {},
}