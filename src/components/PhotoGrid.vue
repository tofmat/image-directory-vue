<template>
  <div class="photo-grid">
    <template v-if="loading">
      <div v-for="i in 8" :key="i" class="grid-item loading-item">
        <div class="loading-image">
          <div class="loading-text">
            <div class="loading-line"></div>
            <div class="loading-line short"></div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div v-for="photo in photos" :key="photo.id" class="grid-item">
        <div class="photo-wrapper" @click="$emit('openModal', photo)">
          <img
            :src="photo.urls.regular"
            :alt="photo.alt_description"
            class="photo"
          />
          <div class="photo-info">
            <p class="photographer">{{ photo.user.name }}</p>
            <p class="location">
              {{ photo.user.location ?? "--" }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { Photo } from "../types/Photo";

export default defineComponent({
  name: "PhotoGrid",
  props: {
    photos: {
      type: Array as PropType<Photo[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["openModal"],
});
</script>

<style lang="scss" scoped>
.photo-grid {
  column-gap: 1.5rem;
  column-count: 1;

  @media (min-width: 640px) {
    column-count: 2;
  }

  @media (min-width: 768px) {
    column-count: 3;
  }

  @media (min-width: 1024px) {
    column-count: 3;
  }

  .grid-item {
    break-inside: avoid;
    margin-bottom: 1.5rem;
  }

  .photo-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    cursor: pointer;

    .photo {
      width: 100%;
      height: auto;
      object-fit: cover;
      display: block;
    }

    .photo-info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: end;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1rem;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      color: #ffffff;

      .photographer {
        margin: 0;
        font-size: 14px;
      }

      .location {
        font-size: 12px;
        margin: 0;
        opacity: 0.8;
      }
    }
  }

  .loading-item {
    .loading-image {
      height: 200px;
      background-color: #e5e7eb;
      border-radius: 0.5rem;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      display: flex;
      align-items: end;
      padding: 2rem;
      .loading-text {
        margin-top: 0.5rem;
        width: 100%;
        .loading-line {
          height: 1.2rem;
          width: 75%;
          background-color: #cbcecf;
          border-radius: 0.25rem;
          margin-bottom: 0.5rem;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

          &.short {
            width: 50%;
          }
        }
      }
    }
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
