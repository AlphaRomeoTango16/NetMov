<template>
    <div class="w-[100%] rounded overflow-hidden shadow-lg bg-[#34495E]">
    <img class="w-[100%] h-[10%]" :src="getIMGPath(`https://image.tmdb.org/t/p/original/${movie.poster_path}`)">
    <div class="mt-3 mr-2 pl-2 flex flex-row justify-between">
        <div class="font-bold text-xl mb-2">{{ movie.title }}</div>
        <a>
          <StarIcon @click="addToFavorite(movie)" class="icon" v-show="!refFavMoviesStore.includes(movie)"/>
          <StarIconActive @click="removeFromFavorite(movie)" class="icon" v-show="refFavMoviesStore.includes(movie)"/>
        </a>
    </div>
    
    <div class="mt-3 mb-2 pl-2">
          <span v-for="genre_id in movie.genre_ids" class="inline-block bg-[#41B883] rounded-lg px-1 py-1 text-[11px] font-semibold text-gray-700 mr-1 mb-2">{{getGenre(genre_id)}}</span>
    </div>
    </div>
</template>

<style>
  .icon {
    width: 20px;
    height: 20px;
    color:#41B883;
  }
  .icon.hidden,
  .icon.passive {
    display: none;
  }
  .icon.active {
    display: inline;
  }
</style>


<script setup lang="ts">
  import { useMovieStore } from '../../store/index';
  import { storeToRefs } from 'pinia';
  import { StarIcon } from '@heroicons/vue/24/outline';
  import { StarIcon as StarIconActive } from '@heroicons/vue/24/solid';

    defineProps<{
      movie: {
        id: number;
        poster_path: string,
        title: string,
        overview: string
        genre_ids: Array<number>
      }
    }>()

    const favMoviesStore = useMovieStore()
    const refFavMoviesStore = storeToRefs(favMoviesStore).getMovies


    function addToFavorite(movie: any) {
      const store = useMovieStore()
      store.addMovie(movie)
    }

    function removeFromFavorite(movie: any) {
      const store = useMovieStore()
      store.deleteMovie(movie)
    }

    function getIMGPath(path: string) {
      return path ? (path) : "";
    }

    function getGenre(genre: number) {
      switch(genre) {
        case 28:
          return 'Action'
          break;
        case 12:
          return 'Aventure'
          break;
        case 16:
          return 'Animation'
          break;
        case 35:
          return 'Comedie'
          break;
        case 80:
          return 'Crime'
          break;
        case 99:
          return 'Documentaire'
          break;
        case 18:
          return 'Drame'
          break;
        case 10751:
          return 'Famille'
          break;
        case 14:
          return 'Fantaisie'
          break;
        case 36:
          return 'Histoire'
          break;
        case 27:
          return 'Horreur'
          break;
        case 10402:
          return 'Musique'
          break;
        case 9648:
          return 'Mystère'
          break;
        case 10749:
          return 'Romance'
          break;
        case 878:
          return 'Science Fiction'
          break;
        case 10770:
          return 'Téléfilm'
          break;
        case 53:
          return 'Thriller'
          break;
        case 10752:
          return 'Guerre'
          break;
        case 37:
          return 'Western'
          break;
      }
    }

</script>