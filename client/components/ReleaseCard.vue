<template>
  <NuxtLink :to="`/release/${id}`" class="flex flex-col space-y-1 text-white rounded">
    <div class="relative">
        <div class="bg-gray-500 rounded-md">
          <img
            :src="image"
            alt="Artist Picture"
            class="rounded-md object-cover aspect-square bg-gray-500 drop-shadow-2xl w-full"
          />
        </div>
        <div v-if="displayDate" class="absolute top-1 right-1 px-2 py-0.5 rounded text-white bg-gray-500 bg-opacity-80">
            <p class="text-center text-xs">{{ new Date(date).toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit', year:'2-digit' }) }}</p>
        </div>
    </div>
    <div>
      <div class="flex text-xs md:text-sm">
        <span class="truncate"><span class="font-semibold">{{name}}</span></span>
      </div>
      <div class="flex text-xs md:text-sm">
        <p>{{type}}</p>
        <div v-if="artists" class="bg-white mt-2 mx-2 h-1 w-1 rounded-full"></div>
        <p v-if="artists" class="truncate">
          <span v-for="(artist, index) in artists" :key="index">
            {{ artist.name }} <span v-if="artists.length > 1 && index != artists.length-1">,</span>
          </span>
        </p>
      </div>
    </div>
  </NuxtLink>
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
        type: String,
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
      artists: {
        type: Array
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