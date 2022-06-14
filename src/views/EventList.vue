<template>
    <div class="events">
        <h1>Events for good</h1>
        <EventCard v-for="(item, i) in events" :key="i" :event="item" />
        <div class="pagination">
            <router-link
                id="page-next"
                :to="{ name: 'event-list', query: { page: page + 1 } }"
                rel="next"
                v-if="!hasNextPage"
                >next</router-link
            >
            <router-link
                v-if="page != 1"
                rel="prev"
                id="page-prev"
                :to="{ name: 'event-list', query: { page: page - 1 } }"
                >prev</router-link
            >
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/core/services/EventService'
export default {
    name: 'EventList',
    props: ['page'],
    components: {
        EventCard, // register it as a child component
    },
    data() {
        return {
            events: null,
            totalEvent: 0,
        }
    },
    beforeRouteEnter(to, from, next) {
        EventService.getEvents(2, parseInt(to.query.page) || 1)
            .then((res) => {
                next((comp) => {
                    comp.events = res.data
                    comp.totalEvent = parseInt(res.headers['x-total-count'])
                })
            })
            .catch(() => next({ name: 'NetworkError' }))
    },
    beforeRouteUpdate(to) {
        return EventService.getEvents(2, parseInt(to.query.page) || 1)
            .then((res) => {
                this.events = res.data
                this.totalEvent = parseInt(res.headers['x-total-count'])
            })
            .catch(() => {
                return { name: 'NetworkError' }
            })
    },
    computed: {
        hasNextPage() {
            let totalPages = Math.ceil(this.totalEvent / 2)
            return this.page >= totalPages
        },
    },
}
</script>
<style scoped>
.events {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.pagination {
    display: flex;
    width: 290px;
}
.pagination a {
    flex: 1;
    text-decoration: none;
    color: #2c3e50;
}

#page-prev {
    text-align: left;
}

#page-next {
    text-align: right;
}
</style>
