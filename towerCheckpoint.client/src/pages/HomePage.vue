<template>
  <div class="container-fluid  mb-5">
    <div class="row align-items-center mb-5 chairs-pic">
      <div class="col-4 offset-1 text-light">
        <h1 class="fs-4">Get ahead of the scalpers. Reserve your seat now with real events for real people.</h1>
      </div>
    </div>
    <div class="row justify-content-center mb-5">
      <div class="col-10 d-flex justify-content-around btn-secondary">
        <button @click="changeFilterCategory('')" class="btn text-light">All</button>
        <button @click="changeFilterCategory('concert')" class="btn text-light">Concert</button>
        <button @click="changeFilterCategory('convention')" class="btn text-light">Convention</button>
        <button @click="changeFilterCategory('sport')" class="btn text-light">Sport</button>
        <button @click="changeFilterCategory('digital')" class="btn text-light">Digital</button>
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
import { onMounted, computed, ref } from 'vue';
import { eventsService } from '../services/EventsService'
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import EventCard from '../components/EventCard.vue';

export default {
  setup() {
      const filterCategory = ref('')
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
          events: computed(() => {
            if (!filterCategory.value) {
              return AppState.events
            } else {
              return AppState.events.filter(e => e.type == filterCategory.value)
            }
          }),
          

          changeFilterCategory(category) {
            filterCategory.value = category
          }
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
