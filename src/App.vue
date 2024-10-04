<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <h1 class="title">Unsplash Clone</h1>
      </div>
    </header>
    <main class="main">
      <div class="container">
        <SearchBar @search="handleSearch" :searching="searching" />
        <PhotoGrid :photos="photos" :loading="loading" @openModal="openModal" />
      </div>
    </main>
    <ImageModal :photo="selectedPhoto" :show="showModal" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import SearchBar from "./components/SearchBar.vue";
import PhotoGrid from "./components/PhotoGrid.vue";
import ImageModal from "./components/ImageModal.vue";
import { useUnsplashApi } from "./composables/useUnsplashApi";
import type { Photo } from "./types/Photo";

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

    const handleSearch = async (query: string) => {
      searching.value = true; // Start loading before making the request
      photos.value = await searchPhotos(query); // Fetch the search results and update photos
      searching.value = false;
      console.log(photos.value); // Check if photos.value is being updated properly
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
      photos.value = await fetchPhotos();
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
    };
  },
});
</script>
