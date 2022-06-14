<template>
    <div v-if="event">
        <p>Register Event here</p>
        <button @click="register">Register Me</button>
    </div>
</template>
<script>
export default {
    props: ['event'],
    inject: ['GStore'], // <---- Inject the Global Store
    methods: {
        register() {
            this.GStore.flashMessage =
                'You are successfully registered for ' + this.event.title
            setTimeout(() => {
                this.GStore.flashMessage = ''
            }, 3000)
            this.$router.push({
                name: 'EventDetails',
                params: { id: this.event.id },
            })
        },
    },
}
</script>
