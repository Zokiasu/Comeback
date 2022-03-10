<template>
  <div :id="`artist-card-${id}`" class="text-white">
    <div class="h-20 md:h-40 w-20 md:w-40 mx-auto">
      <NuxtLink :to="`/artist/${id}`">
        <img 
          :src="image"
          :alt="name"
         
          class="rounded-full h-20 md:h-40 w-20 md:w-40 object-cover bg-gray-700"
        />
      </NuxtLink>
    </div>
    <NuxtLink 
      :to="`/artist/${id}`" 
      :class="groupSize > 0 ? 'flex flex-col justify-center space-x-1':''">
      <h2 class="font-semibold text-center hover:underline">{{name}}</h2>
      <h3 class="text-center" v-if="groupSize > 0 && type != 'GROUP'">[{{groups[0].name}}]</h3>
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
        required: true,
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