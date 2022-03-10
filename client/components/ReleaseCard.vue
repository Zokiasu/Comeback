<template>
  <NuxtLink :to="`/release/${id}`" class="texts flex flex-col text-white rounded">
    <div class="relative h-36 w-36 xl:h-40 xl:w-40">
        <div class="bg-gray-500 rounded-md">
          <img 
            :src="image" 
            loading="lazy"
            alt="Artist Picture" 
            class="rounded-md object-cover aspect-square bg-gray-500 h-36 w-36 xl:h-40 xl:w-40"
          />
        </div>
        <div v-if="displayDate" class="absolute top-1 right-1 px-2 py-0.5 rounded text-white bg-gray-500 bg-opacity-80">
            <p class="text-center text-xs">{{ new Date(date).toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit', year:'2-digit' }) }}</p>
        </div>
    </div>
    <div class="w-32 lg:w-40">
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

<style>
  .texts {
    font-family:
      'Sarala'
      'Quicksand',
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    letter-spacing: 1px;
  }
</style>