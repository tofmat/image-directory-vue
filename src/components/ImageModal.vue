<template>
  <Transition name="fade-background">
    <div v-if="show" class="modal-overlay" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <div
          class="modal-image-container"
          :style="{
            backgroundColor: photo?.color,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }"
        >
          <img
            :src="photo?.urls.regular"
            :alt="photo?.alt_description"
            class="modal-image"
            loading="lazy"
          />
        </div>
        <div class="modal-user">
          <p class="photographer">{{ photo?.user.name }}</p>
          <p class="location">
            {{ photo?.user.location ?? "--" }}
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { Photo } from "../types/photo";

export default defineComponent({
  name: "ImageModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    photo: {
      type: Object as PropType<Photo | null>,
      required: true,
    },
  },
  emits: ["close"],
});
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 800px;
  height: auto;
  max-height: 900px;
  overflow-y: auto;
  position: relative;

  .modal-image-container {
    display: flex;
    justify-content: center;
    max-height: 500px;
    .modal-image {
      border-radius: inherit;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  .modal-user {
    padding: 1.5rem;
    margin: 0;
    color: #111827;

    .photographer {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      text-transform: capitalize;
    }

    .location {
      font-size: 16px;
      margin: 0;
      margin-top: 10px;
      opacity: 0.6;
    }
  }
}

.fade-background-enter-active,
.fade-background-leave-active {
  transition: opacity 0.4s ease;
}

.fade-background-enter-from,
.fade-background-leave-to {
  opacity: 0;
}

.fade-background-enter-to,
.fade-background-leave-from {
  opacity: 1;
}
</style>
