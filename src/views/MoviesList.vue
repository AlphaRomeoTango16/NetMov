<template>
      <div class="bg-hero bg-no-repeat bg-cover bg-center bg-fixed" :style="movie.poster_path ? {backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`} : ''">
        <MovieCategory
            :genre="genre"
        />
      </div>
  </template>
    
  <script lang="ts">
  import MovieCategory from '../components/MovieCategory.vue'
  import { defineComponent } from "vue";
  import axios from 'axios';
  
  interface Movie {
    id: number,
    poster_path: string,
    title: string,
    overview: string
    genre_ids: Array<number>
  }

  interface Genre {
    id: number,
    name: string
  }
  
  export default defineComponent({
    name: "MoviesList",
    components: { MovieCategory},
  
    data: () => ({
      movie: {} as Movie,
      genre: {} as Genre
    }),
  
    mounted() {
    this.getMovieCover();
    },
  
    methods: {
      getMovieCover() {
      axios
        .get(`https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1`,
        {headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }})
        .then((response) => {
        const array = response.data.results;
        this.movie = array[Math.floor(Math.random()*array.length)]
        })
        .catch((err) => console.log(err));
        }
      }
  });
  
  </script>
  