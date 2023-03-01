<template>
  <div class="container-fluid  mb-5">
    <div class="row align-items-center mb-5 chairs-pic">
      <div class="col-4 offset-1 text-light">
        <h1 class="fs-4">Get ahead of the scalpers. Reserve your seat now with real events for real people.</h1>
      </div>
    </div>
    <div class="row justify-content-center mb-5">
      <div class="col-10 d-flex justify-content-around btn-secondary">
        <button class="btn text-light">All</button>
        <button class="btn text-light">Concert</button>
        <button class="btn text-light">Convention</button>
        <button class="btn text-light">Sport</button>
        <button class="btn text-light">Digital</button>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div v-for="event in events" class="col-md-3 my-3">
       <EventCard :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { eventsService } from '../services/EventsService'
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import EventCard from '../components/EventCard.vue';

export default {
    setup() {
        async function getEvents() {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                Pop.error(error, "[geting events]");
            }
        }
        onMounted(() => {
            getEvents();
        });
        return {
            events: computed(() => AppState.events)
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">
.chairs-pic {
  background-image: url(chairs.png);
  background-size: cover;
  height: 30vh;
  background-position: center;
}
</style>
