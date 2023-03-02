<template>
    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>


<script>
import EventForm from './EventForm.vue';

export default {
    setup() {
        return {};
    },
    components: { EventForm }
}
</script>


<style lang="scss" scoped></style>