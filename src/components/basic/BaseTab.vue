<template>
 <router-link :to="{name: 'category', params: { id: genre.id}}">
    <button class="w-[100%] text-[13px] text-[#FFFFFF] hover:text-[#41B883] font-[system-ui] !outline-none border-none bg-transparent p-0 focus:ring-0 focus:ring-offset-0 rounded overflow-hidden shadow-lg">
        <h3>{{ genre.name }}</h3>
    </button>
  </router-link>

</template>

<script setup lang="ts">

    defineProps<{
      genre: {
        id: number;
        name: string
      },
    }>()

</script>