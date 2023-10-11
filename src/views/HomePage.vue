<template>
    <div class="bg-hero bg-no-repeat bg-cover bg-center bg-fixed" :style="{backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`}">
      <PopularMovie/>
    </div>
</template>

<script lang="ts">
import PopularMovie from '../components/PopularMovie.vue'
import { defineComponent } from "vue";
import axios from 'axios';

interface Movie {
  id: number;
  poster_path: string,
  title: string,
  overview: string
  genre_ids: Array<number>
}

export default defineComponent({
  name: "HomePage",
  components: { PopularMovie },

  data: () => ({
    movie: {} as Movie
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
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmY5MzBlNTQ3YThiZDNlZGQwZjg3OTlkNWJhMzk0NCIsInN1YiI6IjY1MjNkMTAxYWI1ZTM0MDBmZTMzNzRkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuoR9kT3ecSUf13i0tkXKl2C8jRvU2sMvaUbf9vO360`
          }})
      .then((response) => {
      this.movie = response.data.results.sort((a: { popularity: number; }, b: { popularity: number; }) => b.popularity-a.popularity).slice(0, 1)[0];
      })
      .catch((err) => console.log(err));
      },
      getIMGPath(path: string) {
      return path ? (path) : "";
    }
    }
});

</script>
