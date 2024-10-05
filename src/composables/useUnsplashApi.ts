import { ref } from "vue";
import axios from "axios";
import type { Photo } from "../types/photo";

const API_URL = "https://api.unsplash.com";
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
export function useUnsplashApi() {
  const loading = ref(false);

  const fetchPhotos = async (count = 8): Promise<Photo[]> => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/photos/random`, {
        params: {
          count,
          query: "african",
          client_id: ACCESS_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching photos:", error);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const searchPhotos = async (query: string): Promise<Photo[]> => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/search/photos`, {
        params: {
          query,
          per_page: 8,
          client_id: ACCESS_KEY,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error searching photos:", error);
      return [];
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    fetchPhotos,
    searchPhotos,
  };
}
