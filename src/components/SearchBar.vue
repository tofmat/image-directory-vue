<template>
  <div class="search-bar">
    <div class="search-container">
      <div class="input-wrapper">
        <template v-if="showingSearchResult">
          <div class="searchResult">
            <p class="searching-message">
              Search Result for <span class="query">"{{ query }}"</span>
            </p>
            <div class="close-icon" @click="endSearch">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>
        </template>
        <template v-else-if="!searching && !showingSearchResult">
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
            placeholder="Search for photo"
            type="search"
          />
        </template>
        <template v-else-if="searching">
          <p class="searching-message">
            Searching for <span class="query">"{{ query }}"</span>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "SearchBar",
  emits: ["search", "photoSearch"],
  props: {
    searching: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const query = ref("");
    const showingSearchResult = ref(false);
    const startSearch = () => {
      showingSearchResult.value = true;
      emit("search", query.value);
    };

    const endSearch = () => {
      showingSearchResult.value = false;
      query.value = "";
      emit("photoSearch");
    };

    return {
      query,
      startSearch,
      showingSearchResult,
      endSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-bar {
  .search-container {
    max-width: 60rem;
    margin: 0 auto;

    .input-wrapper {
      position: relative;
      .searchResult {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
        .close-icon {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
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
        height: 54px;
        width: 100%;
        padding: 0.5rem 0.75rem 0.5rem 2.5rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        line-height: 1.25rem;
        color: #111827;
        background-color: #ffffff;
        outline: none;

        &::placeholder {
          color: #9ca3af;
        }

        &:focus {
          outline: none;
          border-color: none;
        }
      }

      .searching-message {
        font-size: 2rem;
        margin: 0;
        color: #1e2738;
        .query {
          color: #9ca3af;
        }
        @media (min-width: 768px) {
          font-size: 3rem;
        }
      }
    }
  }
}
</style>
