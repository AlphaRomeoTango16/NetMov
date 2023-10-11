<template>
 <router-link :to="{name: 'category', params: { id: genre.id}}">
    <button class="w-[100%] rounded overflow-hidden shadow-lg">
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