<template>
    <h1>Create an event</h1>

    <div class="form-container">
        {{ userModule.user.name }}
        <form @submit.prevent="onSubmit">
            <label>Select a category: </label>
            <select v-model="event.category">
                <option
                    v-for="option in categories"
                    :value="option"
                    :key="option"
                    :selected="option === event.category"
                >
                    {{ option }}
                </option>
            </select>

            <h3>Name & describe your event</h3>

            <label>Title</label>
            <input v-model="event.title" type="text" placeholder="Title" />

            <label>Description</label>
            <input
                v-model="event.description"
                type="text"
                placeholder="Description"
            />

            <h3>Where is your event?</h3>

            <label>Location</label>
            <input
                v-model="event.location"
                type="text"
                placeholder="Location"
            />

            <h3>When is your event?</h3>
            <label>Date</label>
            <input v-model="event.date" type="text" placeholder="Date" />

            <label>Time</label>
            <input v-model="event.time" type="text" placeholder="Time" />

            <button type="submit">Submit</button>
        </form>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            categories: [
                'sustainability',
                'nature',
                'animal welfare',
                'housing',
                'education',
                'food',
                'community',
            ],
            event: {
                category: '',
                title: '',
                description: '',
                location: '',
                date: '',
                time: '',
            },
        }
    },
    methods: {
        onSubmit() {
            const event = {
                ...this.event,
                id: Math.floor(Math.random() * 10000000),
                organizer: this.userModule.user.name,
            }
            this.$store
                .dispatch('eventModule/createEvent', event)
                .then(() => {
                    this.$router.push({
                        name: 'EventLayout',
                        params: { id: event.id },
                    })
                })
                .catch((err) => console.log(err))
        },
    },
    computed: {
        ...mapState(['userModule']),
    },
}
</script>
