<template>
  <div class="flex flex-col space-y-1 text-white">
    <NuxtLink :to="`/release/${id}`">
      <div class="relative">
        <div class="bg-gray-500 rounded-md">
          <img
            :src="image"
            alt="Artist Picture"
            class="rounded-md object-cover aspect-square bg-gray-500 drop-shadow-2xl w-full"
          />
        </div>
        <div v-if="displayDate" class="absolute top-2 right-1.5 px-2 py-0.5 rounded text-white bg-gray-500 bg-opacity-80">
            <p class="text-center text-xs">{{ new Date(date).toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit', year:'2-digit' }) }}</p>
        </div>
      </div>
    </NuxtLink>
    <div>
      <NuxtLink :to="`/release/${id}`" class="flex text-xs md:text-sm">
        <p class="truncate font-semibold hover-underline-animation">{{ name }}</p>
      </NuxtLink>
      <div class="flex text-xs md:text-sm">
        <p>{{type}}</p>
        <div v-if="artist" class="bg-white mt-2 mx-2 h-1 w-1 rounded-full"></div>
        <NuxtLink :to="`/artist/${id}`">
          <p v-if="artist" class="truncate">{{ artist.name }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment-timezone'
  export default {
    name: "releaseCard",

    props: {
      id: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      date: {
        required: true
      },
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      artist: {
        type: Object
      },
      displayDate: {
        type: Boolean,
        default: false
      },
    },

    computed: {
      validationDate(){
        return this.checkDate()
      },
    },

    methods :{
      checkDate(){
        return moment(new Date(this.date)).isAfter(new Date())
      },
    }
  }
</script>