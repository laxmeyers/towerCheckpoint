<template>
    <form @submit.prevent="">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create Event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label for="name" class="form-label">Title</label>
                <input required type="text" class="form-control" id="name" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="location" class="form-label">Location</label>
                <input type="text" class="form-control" id="location" required>
            </div>
            <div class="mb-3">
                <label for="capacity" class="form-label">Capacity</label>
                <input required type="number" class="form-control" id="capacity">
            </div>
            <div class="mb-3">
                <label for="StartDate" class="form-label">Start Date</label>
                <input required type="date" class="form-control" id="StartDate">
            </div>
            <select class="form-select" aria-label="Default select example">
                <option selected value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
            </select>
        </div>
        <div class="modal-footer">
            <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
    </form>
</template>


<script>
export default {
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped></style>