<template>
    <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
        <div class="card selectable">
            <img class="same-size rounded" :src="event.coverImg" alt="">
            <div class="card-body text-dark">
                <div class="text-limit align-items-center d-flex"><h5 class="fs-5">{{ event.name }}</h5></div>
                <div class="text-limit">{{ event.description }}</div>
                <div class="mt-1">{{ new Date(event.startDate).toLocaleDateString() }}</div>
                <div v-if="event.isCanceled" class="bg-danger w-100 rounded text-center">
                    <small >Event Is Canceled</small>
                </div>
                <div class="text-end mt-1" v-else-if="event.capacity > 0">
                    <h5 class="fs-5">Open Seats: {{ event.capacity }}</h5>
                </div>
                <div v-else-if="event.capacity == 0" class="text-end">
                    <h5 class="fs-5">No Open Seats</h5>
                </div>
            </div>
        </div>
    </router-link>
</template>


<script>
export default {
    props: {
        event: {type: Object, required: true}
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>

.text-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  max-height: 8vh;
  height: 8vh;
}

.same-size {
  height: 25vh;
  object-fit: cover;
}

</style>