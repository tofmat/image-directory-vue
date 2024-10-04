<template>
  <div class="search-bar">
    <div class="search-container">
      <label for="search" class="sr-only">Search photos</label>
      <div class="input-wrapper">
        <template v-if="!searching">
          <svg
            class="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            id="search"
            v-model="query"
            @keyup.enter="startSearch"
            class="search-input"
            placeholder="Search photos"
            type="search"
          />
        </template>
        <template v-else>
          <p class="searching-message">Searching for "{{ query }}"...</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "SearchBar",
  emits: ["search", "setLoading"],
  props: {
    searching: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const query = ref("");
    const startSearch = () => {
      console.log(query.value);

      emit("search", query.value);
    };

    return {
      query,
      startSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-bar {
  margin-bottom: 2rem;

  .search-container {
    max-width: 36rem;
    margin: 0 auto;

    .input-wrapper {
      position: relative;

      .search-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1.25rem;
        height: 1.25rem;
        color: #9ca3af;
        pointer-events: none;
      }

      .search-input {
        display: block;
        width: 100%;
        padding: 0.5rem 0.75rem 0.5rem 2.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: #111827;
        background-color: #ffffff;

        &::placeholder {
          color: #9ca3af;
        }

        &:focus {
          outline: none;
          border-color: #6366f1;
        }
      }

      .searching-message {
        font-size: 1rem;
        color: #6b7280;
      }
    }
  }
}
</style>
