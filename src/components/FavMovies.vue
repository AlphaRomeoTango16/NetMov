<template>
    <div class="pt-10 pb-10 pl-10 pr-10 w-full h-[700px] bg-[#34495E] bg-opacity-75">
     <h1>Films favoris</h1>
      <div v-show="refStore.length === 0" class="mt-10 w-full flex flex-row">
          <h3>Vous n'avez aucun films favoris pour le moment</h3>
      </div>
      <div v-show="refStore.length > 0" class="mt-10 w-full flex flex-row">
        <div class="w-[20%] mr-10" 
          v-for="movie in refStore"
          v-bind:key="movie.id"
        >
          <BaseMovieCard :movie="movie"/>
        </div>
      </div>
    </div>
  </template>
  
    
  <script lang="ts">
  import BaseMovieCard from './basic/BaseMovieCard.vue';
  import { defineComponent } from "vue";
  import { useMovieStore } from '../store/index';
  import { storeToRefs } from 'pinia';
    
  interface Movie {
      id: number;
      poster_path: string,
      title: string,
      overview: string
      genre_ids: Array<number>
  }
  
  export default defineComponent({
  name: "FavoritesMovies",
  components: { BaseMovieCard },

  setup() {
    const store = useMovieStore()
    const refStore = storeToRefs(store).getMovies
    return { refStore }
  },
  
  data: () => ({
    movies: [] as Movie[],
    refStore: [] as Movie[]
  }),
  
});
  
  </script>
    