<template>
    <div class="bg-hero bg-no-repeat bg-cover bg-center bg-fixed" :style="{backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`}">
      <FavMovies
      />
    </div>
</template>
  
<script lang="ts">
import FavMovies from '../components/FavMovies.vue'
import { defineComponent } from "vue";

interface Movie {
  id: number,
  poster_path: string,
  title: string,
  overview: string
  genre_ids: Array<number>
}

export default defineComponent({
  name: "FavList",
  components: { FavMovies },

  data: () => ({
    movie: {} as Movie
    })
});

</script>
