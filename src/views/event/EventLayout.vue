<template>
    <div v-if="eventStore.event">
        <h1>{{ eventStore.event.title }}</h1>
        <div id="nav">
            <router-link :to="{ name: 'EventDetails' }">Details</router-link>
            |
            <router-link :to="{ name: 'EventRegister' }">Register</router-link>
            |
            <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
        </div>
        <router-view :event="eventStore.event"></router-view>
    </div>
</template>

<script>
import PiniaEvent from '@/store/modules/event'

export default {
    inject: ['GStore'],
    setup() {
        const eventStore = PiniaEvent()
        return {
            eventStore,
        }
    },
}
</script>
