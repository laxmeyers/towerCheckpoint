<template>
  <div v-if="event.id">
    <div class="container-fluid bg-image" :style="{ 'background-image': 'url(' + event.coverImg + ')' }">
      <div class="row" :class="event.isCanceled ? 'bg-red' : 'bg-opac'">
        <button v-if="account.id == event.creatorId && !event.isCanceled" class="btn btn-info"
          @click="cancelEvent()">Cancel Event</button>
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
              <div class="d-flex h-100 align-items-center bg-see">
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
                  <button v-if="!eventGoer[0] && account.id" class="btn btn-warning me-5 mb-3" @click="createTicket(event.id)"> Attend
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
      <div class="row" v-if="tickets[0]">
        <div class="col-12 d-flex bg-secondary">
          <div v-for="ticket in tickets" class="p-1">
            <img class="img-fluid rounded-circle profile-img" :src="ticket.profile.picture" alt=""
              :title="ticket.profile.name">
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12 d-flex bg-secondary">
          <h1>There is no one attending this event yet...</h1>
        </div>
      </div>
    </div>

    <div class="container mb-5">
      <div class="row mb-2 justify-content-center" v-if="account.id">
        <div class="col-10 text-end">
          <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#commentForm">Comment</button>
        </div>
      </div>
      <div  class="row justify-content-center">
        <div v-if="comments[0]" class="col-10 bg-light border-bottom border-danger border-3" v-for="c in comments">
          <div class="d-flex align-items-center p-2 justify-content-between">
            <div class="d-flex align-items-center w-100">
              <img class="img-fluid profile-img rounded-circle" :src="c.creator.picture" alt="" :title="c.creator.name">
              <p class="m-0 text-wrap ms-3 p-1 border border-dark border-1">{{ c.body }}</p>
            </div>
            <div v-if="c.creatorId == account.id"><i @click="destroycomment(c.id)"
                class="mdi mdi-delete-outline text-danger selectable fs-3"></i></div>
          </div>
        </div>
        <div v-else class="col-10 bg-light border-bottom border-danger border-3">
          <h5>There are no comments.</h5>
          <h5>Be the first To make a comment.</h5>
        </div>
      </div>
      <div  class="row justify-content-center">
      </div>
    </div>

    <Modal id="commentForm">
      <CommentForm />
    </Modal>

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
import Modal from '../components/Modal.vue';
import CommentForm from '../components/CommentForm.vue';

export default {
  setup() {
    const route = useRoute();
    async function getActiveEvent() {
      try {
        const eventId = route.params.eventId;
        await eventsService.getActiveEvent(eventId);
        await ticketsService.getPeoplesTickets(eventId);
        await eventsService.getComments(eventId);
      }
      catch (error) {
        Pop.error(error, "[getting single event]");
      }
    }
    onMounted(() => {
      getActiveEvent();
    });
    return {
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.eventTickets),
      account: computed(() => AppState.account),
      eventGoer: computed(() => AppState.eventTickets.filter(t => t.accountId == AppState.account.id)),
      comments: computed(() => AppState.comments),
      async createTicket(eventId) {
        try {
          await ticketsService.createTicket({ eventId });
        }
        catch (error) {
          Pop.error(error, "[making a ticket]");
        }
      },
      async cancelEvent() {
        try {
          if (await Pop.confirm('Are You sure you want to?')) {
            await eventsService.cancelEvent();
            Pop.success('Event canceled')
          }
        }
        catch (error) {
          Pop.error(error, "[canceling event]");
        }
      },
      async destroycomment(commentId) {
        try {
          if (await Pop.confirm("You sure?")) {
            await eventsService.destroyComment(commentId);
            Pop.success("comment deleted");
          }
        }
        catch (error) {
          Pop.error(error, "[deleting comment]");
        }
      }
    };
  },
  components: { Modal, CommentForm }
}
</script>

<style scoped lang="scss">
.bg-red{
  background-color: rgba(114, 0, 0, 0.363);
}
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

.text-wrap{
  inline-size: 50vw;
  overflow-wrap: break-word;
}

.bg-see{
  text-shadow: 2px 1px black;
}
</style>