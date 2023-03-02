<template>
  <div v-if="event.id">
    <div class="container-fluid bg-image" :style="{ 'background-image': 'url(' + event.coverImg + ')' }">
      <div class="row bg-opac">
        <button v-if="account.id == event.creatorId && !event.isCanceled" class="btn btn-danger" @click="cancelEvent()">Cancel Event</button>
        <div class="col-12">
          <div class="row">
            <div class="col-md-5 my-3">
              <img class="img-fluid" :src="event.coverImg" alt="">
            </div>
            <div class="col-md-7 mt-3 d-flex flex-column">
              <div class="d-flex justify-content-between">
                <h1 class="fs-2">{{ event.name }}</h1>
                <h3 class="fs-5">{{ new Date(event.startDate).toLocaleDateString() }}</h3>
              </div>
              <h4>{{ event.location }}</h4>
              <div class="d-flex h-100 align-items-center">
                <p>{{ event.description }}</p>
              </div>
              <div v-if="event.isCanceled" class="justify-content-end align-items-end d-flex flex-column">
                <div class="d-flex justify-content-between w-100">
                  <h5 class="mt-2 bg-danger p-2 rounded">Event Is Canceled</h5>
                </div>
              </div>
              <div v-else-if="event.capacity > 0" class="justify-content-end align-items-end d-flex flex-column">
                <div class="d-flex justify-content-between w-100">
                  <h5 class="mt-2">{{ event.capacity }} spots left</h5>
                  <button v-if="!eventGoer[0]" class="btn btn-warning me-5 mb-3" @click="createTicket(event.id)"> Attend
                    <i class="mdi mdi-human"></i></button>
                </div>
              </div>
              <div v-else class="justify-content-end align-items-end d-flex flex-column">
                <div class="d-flex justify-content-start w-100">
                  <h5 class="mt-2">No Spots Left</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="container my-5">
      <div class="row">
        <div class="col-12 d-flex bg-secondary">
          <div v-for="ticket in tickets" class="p-1">
            <img class="img-fluid rounded-circle profile-img" :src="ticket.profile.picture" alt=""
              :title="ticket.profile.name">
          </div>
        </div>
      </div>
    </div>

  </div>
  <div v-else>
    <div class="container-fluid" style="background-image: url({{  }});">
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <h1><i class="mdi mdi-pinwheel mdi-spin"></i></h1>
          <h1><i class="mdi mdi-pinwheel mdi-spin"></i></h1>
          <h1><i class="mdi mdi-pinwheel mdi-spin"></i></h1>
          <h1><i class="mdi mdi-pinwheel mdi-spin"></i></h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService';
import { AppState } from '../AppState';
import { ticketsService } from '../services/TicketsService'
import Pop from '../utils/Pop';

export default {
  setup() {
    const route = useRoute()

    async function getActiveEvent() {
      try {
        const eventId = route.params.eventId
        await eventsService.getActiveEvent(eventId)
        await ticketsService.getPeoplesTickets(eventId)
      } catch (error) {
        Pop.error(error, '[getting single event]')
      }
    }

    onMounted(() => {
      getActiveEvent()
    })
    return {
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.eventTickets),
      account: computed(() => AppState.account),
      eventGoer: computed( () => AppState.eventTickets.filter(t => t.accountId == AppState.account.id)),

      async createTicket(eventId) {
        try {
          await ticketsService.createTicket({ eventId })
        } catch (error) {
          Pop.error(error, '[making a ticket]')
        }
      },

      async cancelEvent() {
        try {
          await eventsService.cancelEvent()
        } catch (error) {
          Pop.error(error, '[canceling event]')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bg-opac {
  background-color: rgba(0, 0, 255, 0.651);
}

.bg-image {
  background-size: cover;
  background-position: center;
}

.profile-img {
  height: 7vh;
}
</style>