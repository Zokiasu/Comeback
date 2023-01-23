<template>
  <div class="flex flex-col justify-center space-y-1">
    <NuxtLink :to="`/artist/${id}`">
      <img
        :alt="name"
        :src="image"
        class="aspect-video max-h-[10rem] max-w-[10rem] rounded object-cover"
      />
    </NuxtLink>
    <NuxtLink :to="`/artist/${id}`" class="text-center">
      <h2 class="hover-underline-animation">{{ name }}</h2>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Artist',

  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
