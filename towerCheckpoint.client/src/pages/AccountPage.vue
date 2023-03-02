<template>
  <div class="container" v-if="tickets[0]">
    <div class="row">
      <h1>Your Tickets</h1>
      <div class="col-4 mb-3" v-for="t in tickets">
        <TicketCard :event="t.event" :ticket="t" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService'
import Pop from '../utils/Pop'
export default {
    setup() {
        async function getMytickets() {
            try {
                await ticketsService.getMyTickets();
            }
            catch (error) {
                Pop.error(error, "[getting my tickets]");
            }
        }
        onMounted(() => {
            getMytickets();
        });
        return {
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.myTickets)
        };
    },
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
