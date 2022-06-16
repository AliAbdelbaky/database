<template>
    <div id="app">
        <div id="flashMessage" v-if="GStore.flashMessage">
            {{ GStore.flashMessage }}
        </div>
        <nav>
            <router-link :to="{ name: 'event-list' }">Events</router-link> |
            <router-link :to="{ name: 'about' }">About</router-link> |
            <router-link :to="{ name: 'EventCreate' }">Create Event</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    inject: ['GStore'],
}
</script>
<style lang="scss">
@keyframes yellowfade {
    from {
        background: yellow;
    }
    to {
        background: transparent;
    }
}

#flashMessage {
    animation-name: yellowfade;
    animation-duration: 3s;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
