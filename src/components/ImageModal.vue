<template>
  <transition name="fade">
    <div v-if="show" class="modal-overlay" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">{{ photo?.user.name }}</h3>
        <img
          :src="photo?.urls.full"
          :alt="photo?.alt_description"
          class="modal-image"
        />
        <button class="modal-close" @click="$emit('close')">Close</button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { Photo } from "../types/Photo";

export default defineComponent({
  name: "ImageModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    photo: {
      type: Object as PropType<Photo>,
      required: true,
    },
  },
  emits: ["close"],
});
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-content {
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 0.5rem;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;

    .modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #111827;
    }

    .modal-image {
      width: 100%;
      height: auto;
      object-fit: contain;
      margin-bottom: 1rem;
    }

    .modal-close {
      display: block;
      width: 100%;
      padding: 0.5rem;
      background-color: #e5e7eb;
      color: #374151;
      border: none;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #d1d5db;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
