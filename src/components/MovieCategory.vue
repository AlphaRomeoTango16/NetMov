<template>
    <div class="pt-10 pl-10 pr-10 w-[100%] bg-[#34495E] bg-opacity-75">
     <h1>{{genre.name}}</h1>
      <div class="mt-10 w-[100%] flex flex-wrap justify-between">
        <div class="w-[20%] m-5" 
          v-for="movie in movies"
          v-bind:key="movie.id"
        >
          <BaseMovieCard :movie="movie"/>
        </div>
      </div>
    </div>
    
  </template>
    
  <script lang="ts">
  import BaseMovieCard from './basic/BaseMovieCard.vue'
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

  interface Genre {
      id: number;
      name: string
  }
  
  export default defineComponent({
  name: "MovieCategory",
  components: { BaseMovieCard },
  
  data: () => ({
  searchTerm: "",
  movies: [] as Movie[],
  genre: {} as Genre
  }),
  
  mounted() {
  this.getGenre();
  this.listMoviesByCategory();
  },
  
  
  methods: {
    listMoviesByCategory() {
    axios
        .get(`https://api.themoviedb.org/3/discover/movie?with_genres=${this.$route.params.id}`,
        {headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }})
        .then((response) => {
        this.movies = response.data.results;
        })
        .catch((err) => console.log(err));
    },
    getGenre() {
    axios
        .get(`https://api.themoviedb.org/3/genre/movie/list?language=fr`,
        {headers: {
                Accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmY5MzBlNTQ3YThiZDNlZGQwZjg3OTlkNWJhMzk0NCIsInN1YiI6IjY1MjNkMTAxYWI1ZTM0MDBmZTMzNzRkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuoR9kT3ecSUf13i0tkXKl2C8jRvU2sMvaUbf9vO360`
            }})
        .then((response) => {
        this.genre = response.data.genres.filter((item: {id: number, name: string}) => item.id ===  parseInt(this.$route.params.id as string))[0]
      })
        .catch((err) => console.log(err));
    },
  },
  });
  
  </script>
    