<template>
  <div class="pt-10 pb-10 pl-10 pr-10 w-[100%] h-[700px] bg-[#34495E] bg-opacity-75">
   <h1>Tendances</h1>
    <div class="mt-10 w-[100%] flex flex-row justify-between">
      <div class="w-[20%]"
        v-for="movie in movies"
        v-bind:key="movie.id"
      >
        <BaseMovieCard
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import BaseMovieCard from './basic/BaseMovieCard.vue'
import { useMovieStore } from '../store/index';
import { storeToRefs } from 'pinia';
import { defineComponent } from "vue";
import axios from 'axios';

interface Movie {
  id: number;
  poster_path: string,
  title: string,
  overview: string,
  vote_average: number,
  release_date: string,
  genre_ids: Array<number>
}


export default defineComponent({
name: "PopularMovie",
components: { BaseMovieCard },

data: () => ({
searchTerm: "",
movies: [] as Movie[]
}),

setup() {
    const store = useMovieStore()
    const refStore = storeToRefs(store).getMovies
    return { refStore }
},

mounted() {
this.listPopularMovies();
},


methods: {
listPopularMovies() {
axios
    .get(`https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1`,
    {headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }})
    .then((response) => {
    this.movies = response.data.results.sort((a: { popularity: number; }, b: { popularity: number; }) => b.popularity-a.popularity).slice(0, 4);
  })
    .catch((err) => console.log(err));
}
},
});

</script>
  