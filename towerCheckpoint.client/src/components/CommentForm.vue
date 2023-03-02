<template>
    <form @submit.prevent="createComment(event.id)">
        <div class="modal-header">
            <h1 class="modal-title fs-5 text-dark" id="exampleModalLabel">Create Comment</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="form-floating mb-3 text-dark">
                <textarea required v-model="editable.body" class="form-control" placeholder="Leave a comment here" minlength="3" maxlength="500" id="floatingTextarea"></textarea>
                <label for="floatingTextarea">Message</label>
            </div>
        </div>
        <div class="modal-footer">
            <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Event</button>
        </div>
    </form>
</template>


<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({})

        return {
            editable,
            event: computed(() => AppState.activeEvent),

            async createComment(eventId) {
                try {
                    const formData = editable.value
                    formData.eventId = eventId
                    await eventsService.createComment(formData)
                    editable.value = {}
                } catch (error) {
                    Pop.error(error, '[making comment]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>