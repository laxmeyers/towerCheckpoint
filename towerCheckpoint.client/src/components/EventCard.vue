<template>
    <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
        <div class="card selectable">
            <img class="same-size rounded" :src="event.coverImg" alt="">
            <div class="card-body text-dark card-height ">
                <div class="text-limit">{{ event.description }}</div>
                <div class="mt-1">{{ new Date(event.startDate).toLocaleDateString() }}</div>
                <div class="text-end mt-1">
                    <h5 class="fs-5">Open Seats: {{ event.capacity }}</h5>
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

// .card-height{
//   height: 15vh;
//   overflow: hidden;
// }

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