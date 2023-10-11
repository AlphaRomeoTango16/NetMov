<template>
    <div class="pt-10 pb-10 pl-10 pr-10 w-[100%] bg-[#34495E] bg-opacity-75">
     <h1>Films favoris</h1>
      <div class="mt-10 w-[100%] flex flex-row justify-between">
        <!-- <div class="w-[20%]" 
          v-for="movie in store"
          v-bind:key="movie.id"
        >
          <BaseMovieCard :movie="movie"/>
        </div> -->
      </div>
    </div>
  </template>
    
  <script lang="ts" setup>
  // import BaseMovieCard from './basic/BaseMovieCard.vue';
  // import { defineComponent } from "vue";
  import { useMovieStore } from '../store/index';
  import { storeToRefs } from "pinia";
    
  // interface Movie {
  //     id: number;
  //     poster_path: string,
  //     title: string,
  //     overview: string
  //     genre_ids: Array<number>
  // }

  const store = useMovieStore()
  const refStore = storeToRefs(store)

  console.log('refStore', refStore)
  
//   export default defineComponent({
//   name: "FavoritesMovies",
//   components: { BaseMovieCard },
  
//   data: () => ({
//   movies: [] as Movie[]
//   }),
  
// });
  
  </script>
    