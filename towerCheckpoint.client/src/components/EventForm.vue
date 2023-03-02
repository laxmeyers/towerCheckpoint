<template>
    <form @submit.prevent="createEvent()">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create Event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label for="name" class="form-label">Title</label>
                <input v-model="editable.name" required type="text" class="form-control" id="name"
                    aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="location" class="form-label">Location</label>
                <input v-model="editable.location" type="text" class="form-control" id="location" required>
            </div>
            <div class="mb-3">
                <label for="capacity" class="form-label">Capacity</label>
                <input v-model="editable.capacity" required type="number" class="form-control" id="capacity">
            </div>
            <div class="mb-3">
                <label for="StartDate" class="form-label">Start Date</label>
                <input v-model="editable.startDate" required type="date" class="form-control" id="StartDate">
            </div>
            <div class="mb-3">
                <label for="coverImg" class="form-label">Cover Image</label>
                <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg">
            </div>
            <div class="form-floating mb-3">
                <textarea required v-model="editable.description" class="form-control" placeholder="Leave a comment here" minlength="3" maxlength="5000" id="floatingTextarea"></textarea>
                <label for="floatingTextarea">description</label>
            </div>
            <select v-model="editable.type" class="form-select" aria-label="Default select example">
                <option selected value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
            </select>

        </div>
        <div class="modal-footer">
            <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Event</button>
        </div>
    </form>
</template>


<script>
import { ref } from 'vue';
import { AppState } from '../AppState';
import { router } from '../router.js';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({
            type: 'concert'
        })
        return {
            editable,

            async createEvent() {
                try {
                    await eventsService.createEvent(editable.value)
                    editable.value = {}
                    router.push({name: 'Event', params: {eventId: AppState.activeEvent.id}})
                } catch (error) {
                    Pop.error(error, '[making new event]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>