<template>
  <div :id="`artist-card-${id}`" class="text-white max-w-[10rem] aspect-square">
    <NuxtLink :to="`/artist/${id}`">
      <img 
        :src="image"
        :alt="name"
        loading="lazy"
        class="rounded-full object-cover bg-gray-700 aspect-square max-h-[10rem]"
      />
    </NuxtLink>
    <NuxtLink :to="`/artist/${id}`" class="w-full flex flex-col justify-center items-center">
      <h2 class="font-semibold text-center hover-underline-animation">{{name}}</h2>
    </NuxtLink>
  </div>
</template>

<script>
  export default {
    name: "artistCard",

    props: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      }
    },
  }
</script>