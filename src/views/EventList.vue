<template>
    <div class="events">
        <h1>Events for {{ userStore.name || 'alisss' }}</h1>
        <EventCard
            v-for="(item, i) in eventStore.events"
            :key="i"
            :event="item"
        />
        <div class="pagination">
            <router-link
                id="page-next"
                :to="{ name: 'event-list', query: { page: page + 1 } }"
                rel="next"
                v-if="hasNextPage"
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
import PiniaUser from '@/store/modules/user'
import PiniaEvent from '@/store/modules/event'
const getPageEvents = (to, next) => {
    const currentPage = parseInt(to.query.page) || 1
    PiniaEvent()
        .fetchEvents(currentPage)
        .then(() => {
            to.params.page = currentPage
            next()
        })
        .catch(() => next({ name: 'NetworkError' }))
}

export default {
    name: 'EventList',
    props: ['page'],
    setup() {
        const userStore = PiniaUser()
        const eventStore = PiniaEvent()
        return {
            userStore,
            eventStore,
        }
    },
    components: {
        EventCard,
    },
    beforeRouteEnter(to, from, next) {
        getPageEvents(to, next)
    },
    beforeRouteUpdate(to, from, next) {
        getPageEvents(to, next)
    },
    computed: {
        hasNextPage() {
            return (
                this.eventStore.EventsCount >
                this.page * this.eventStore.perPage
            )
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
