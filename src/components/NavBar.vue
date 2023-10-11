<template>
    <nav class="bg-gray-800">
    <div class="ml-5 max-w-7xl px-2 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" src="../assets/logo.svg" alt="NetMov">
            </div>
            <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">

                <router-link to="/" v-slot="{href, navigate}" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">
                    <p :class="$route.params.id ===  '/' ? 'text-[#41B883]' : 'text-[#FFFFFF]'" :href="href" @click="navigate">Accueil</p>
                </router-link>
                
                <p :class="isTabVisible === true ? 'text-[#41B883]' : 'text-[#FFFFFF]'" @click="isTabVisible ? isTabVisible = false : isTabVisible = true" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Liste</p>

                <router-link to="/favorite" v-slot="{href, navigate}" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">
                    <p :class="$route.params.id ===  '/favorite' ? 'text-[#41B883]' : 'text-[#FFFFFF]'" :href="href" @click="navigate">Favoris</p>
                </router-link>

            </div>    
            </div>
        </div>
        </div>
        <div v-show="isTabVisible" class="w-[100%] pb-2">
            <div class="w-[30%] flex flex-row justify-between">
                <div
                    v-for="genre in genres"
                    v-bind:key="genre.id"
                >
                    <BaseTab 
                        :genre="genre"
                        v-on:click="isTabVisible = false"
                    />
                </div>
            </div>
        </div>
    </div>
    </nav>

    <router-view :key="$route.fullPath"></router-view>

</template>
  
<script lang="ts">
import BaseTab from '../components/basic/BaseTab.vue'
import { defineComponent } from "vue";
import axios from 'axios';

interface Genre {
  id: number;
  name: string
}

export default defineComponent({
  name: "NavBar",
  components: { BaseTab },

  data: () => ({
    genres: [] as Genre[],
    isTabVisible: false
  }),

  mounted() {
  this.getGenres();
  },

  methods: {
    getGenres() {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?language=fr`,
      {headers: {
              Accept: 'application/json',
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmY5MzBlNTQ3YThiZDNlZGQwZjg3OTlkNWJhMzk0NCIsInN1YiI6IjY1MjNkMTAxYWI1ZTM0MDBmZTMzNzRkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuoR9kT3ecSUf13i0tkXKl2C8jRvU2sMvaUbf9vO360`
          }})
      .then((response) => {
      this.genres = response.data.genres.filter((genre: {id: number, name: string}) => genre.name === "Action" || genre.name === "Animation" || genre.name === "Aventure" || genre.name === "Comédie" || genre.name === "Documentaire");
      })
      .catch((err) => console.log(err));
      }
    }
});

</script>
  