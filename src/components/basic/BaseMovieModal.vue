<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

  <div class="fixed inset-0 bg-[#34495E] bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

      <div class="relative transform overflow-hidden rounded-lg bg-[#34495E] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-[#34495E] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div>
              <img class="w-[100%]" :src="getIMGPath(`https://image.tmdb.org/t/p/original/${movie.poster_path}`)"/>
              <div class="text-xs mt-5 font-[system-ui]">Note {{ movie.vote_average }}/10</div>
              <div class="text-xs mt-2 font-[system-ui]">Date de sortie : {{ formatDate(movie.release_date) }}</div>
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <div class="flex flex-row justify-between">
                <h3 class="text-base font-semibold leading-6 text-[#FFFFFF]" id="modal-title">{{ movie.title }}</h3>
                <button class="bg-transparent hover:!outline-none !outline-none border-none bg-transparent p-0 focus:ring-0 focus:ring-offset-0" @click="closeModal()">
                  <XMarkIcon class="w-[20px] hover:text-red-500"/>
                </button>
              </div>
              <div class="mt-2">
                <p class="text-sm text-[#FFFFFF] font-[system-ui]">{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-[#34495E] mb-[20px] sm:flex sm:flex-row-reverse sm:px-6">
          <button v-show="!refFavMoviesStore.includes(movie)" type="button" class="mt-3 !outline-none border-none hover:outline-none inline-flex w-full justify-center rounded-md bg-[#41B883] px-3 py-2 text-sm font-semibold text-white hover:bg-black sm:mt-0 sm:w-auto focus:outline-none focus:ring focus:ring-[#41B883]" @click="addToFavorite(movie)">Ajouter aux favoris</button>
          <button v-show="refFavMoviesStore.includes(movie)" type="button" class="mt-3 !outline-none border-none hover:outline-none inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-black sm:mt-0 sm:w-auto focus:outline-none focus:ring focus:ring-[#41B883]" @click="removeFromFavorite(movie)">Retirer aux favoris</button>
        </div>
      </div>
    </div>
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
  import { XMarkIcon } from '@heroicons/vue/24/outline';

    defineProps<{
      movie: {
        id: number;
        poster_path: string,
        title: string,
        overview: string,
        vote_average: number,
        release_date: string,
        genre_ids: Array<number>
      },
      closeModal: any
    }>()

    const favMoviesStore = useMovieStore()
    const refFavMoviesStore = storeToRefs(favMoviesStore).getMovies

    function formatDate (date: string) {
      var datePart = date.split('-');

        const year = datePart[0]
        const month = datePart[1]
        const day = datePart[2]

        return day+'/'+month+'/'+year
    }

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

</script>