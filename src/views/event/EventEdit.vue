<template>
    <div v-if="event">
        <p>Edit Event here</p>
    </div>
</template>

<script>
export default {
    props: ['event'],
}
</script>