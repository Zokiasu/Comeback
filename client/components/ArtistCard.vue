<template>
  <div :id="`artist-card-${id}`" class="text-white">
    <div class="mx-auto aspect-square">
      <NuxtLink :to="`/artist/${id}`">
        <img 
          :src="image"
          :alt="name"
          loading="lazy"
          class="rounded-full object-cover bg-gray-700 aspect-square"
        />
      </NuxtLink>
    </div>
    <NuxtLink :to="`/artist/${id}`" class="w-full flex flex-col justify-center items-center">
      <h2 class="font-semibold text-center hover-underline-animation">{{name}}</h2>
    </NuxtLink>
  </div>
</template>

<script>
  export default {
    name: "artistCard",

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
      type: {
        type: String,
        required: false,
      },
      groups: {
        type: Array,
        required: false,
      },
    },

    computed: {
      groupSize() {
        return this.groups?.length ? this.groups.length : 0
      },
    }
  }
</script>