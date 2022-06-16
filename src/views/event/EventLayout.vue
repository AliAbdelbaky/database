<template>
    <div v-if="eventModule.event">
        <h1>{{ eventModule.event.title }}</h1>
        <div id="nav">
            <router-link :to="{ name: 'EventDetails' }">Details</router-link>
            |
            <router-link :to="{ name: 'EventRegister' }">Register</router-link>
            |
            <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
        </div>
        <router-view :event="eventModule.event"></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    inject:['GStore'],
    computed:{
        ...mapState(['eventModule'])
    }
}
</script>
