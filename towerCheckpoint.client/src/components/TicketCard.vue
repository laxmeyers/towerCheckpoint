<template>
    <div class="card">
        <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
            <img class="same-size img-fluid rounded-top selectable" :src="event.coverImg" alt="">
        </router-link>
        <div class="card-body text-dark">
            <div class="text-limit align-items-center d-flex">
                <h5 class="fs-5">{{ event.name }}</h5>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-1">
                <div class="mt-1">{{ new Date(event.startDate).toLocaleDateString() }}</div>
                <button class=" btn btn-danger move-button" @click="destroyTicket(ticket.id)">delete</button>
            </div>
            <div v-if="event.isCanceled" class="bg-danger w-100 rounded text-center">
                <small>Event Is Canceled</small>
            </div>
        </div>
    </div>
</template>


<script>
import { ticketsService } from '../services/TicketsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    props: {
        event: { type: Object, required: true },
        ticket: {type: Object, required: true}
    },
    setup() {
        return {
            async destroyTicket(ticketId) {
                try {
                    await ticketsService.destroyTicket(ticketId)
                } catch (error) {
                    Pop.error(error, '[deleting ticket]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>