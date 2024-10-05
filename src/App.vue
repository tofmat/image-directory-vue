<template>
  <div class="app">
    <main class="main">
      <div class="container">
        <div class="header-container">
          <SearchBar
            @search="handleSearch"
            :searching="searching"
            @photoSearch="handlePhotoFetch"
          />
        </div>
        <div class="photo-container">
          <PhotoGrid
            :photos="photos"
            :loading="loading"
            @openModal="openModal"
          />
        </div>
      </div>
    </main>
    <div v-if="selectedPhoto">
      <ImageModal
        :photo="selectedPhoto"
        :show="showModal"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import SearchBar from "./components/SearchBar.vue";
import PhotoGrid from "./components/PhotoGrid.vue";
import ImageModal from "./components/ImageModal.vue";
import { useUnsplashApi } from "./composables/useUnsplashApi";
import type { Photo } from "./types/photo";

export default defineComponent({
  name: "App",
  components: {
    SearchBar,
    PhotoGrid,
    ImageModal,
  },
  setup() {
    const { fetchPhotos, searchPhotos, loading } = useUnsplashApi();
    const photos = ref<Photo[]>([]);
    const selectedPhoto = ref<Photo | null>(null);
    const showModal = ref(false);
    const searching = ref(false);

    const handlePhotoFetch = async () => {
      photos.value = await fetchPhotos(); // Fetch the search results and update photos
    };

    const handleSearch = async (query: string) => {
      searching.value = true; // Start loading before making the request
      photos.value = await searchPhotos(query); // Fetch the search results and update photos
      searching.value = false;
    };

    const openModal = (photo: Photo) => {
      selectedPhoto.value = photo;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedPhoto.value = null;
    };

    onMounted(async () => {
      handlePhotoFetch();
    });

    return {
      photos,
      loading,
      selectedPhoto,
      showModal,
      handleSearch,
      openModal,
      closeModal,
      searching,
      handlePhotoFetch,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  .header-container {
    padding: 4em 1em;
    background-color: rgb(222, 227, 234);
    @media (min-width: 640px) {
      padding: 4em 1em;
    }

    @media (min-width: 768px) {
      padding: 6em 1em;
    }

    @media (min-width: 1024px) {
      padding: 8em 1em;
    }
  }
  .photo-container {
    max-width: 55rem;
    margin: 0 auto;
    padding: 1em;
    margin-top: -3rem;
    @media (min-width: 640px) {
      margin-top: -3rem;
    }

    @media (min-width: 768px) {
      margin-top: -4rem;
    }

    @media (min-width: 1024px) {
      margin-top: -5rem;
    }
  }
}
</style>
