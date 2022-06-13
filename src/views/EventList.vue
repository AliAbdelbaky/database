<template>
    <div class="events">
        <h1>Events for good</h1>
        <EventCard v-for="(item, i) in events" :key="i" :event="item" />
    </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/core/services/EventService'
export default {
    name: 'EventList',
    components: {
        EventCard, // register it as a child component
    },
    data() {
        return {
            events: null,
        }
    },
    created() {
        EventService.getEvents()
            .then((res) => {
                this.events = res.data
            })
            .catch((err) => console.log(err))
    },
}
</script>
<style scoped>
.events {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

