<template>
  <NuxtLink
    :to="`/artist/${artist.id}`"
    class="flex w-full overflow-hidden rounded-lg text-tertiary transition-all duration-500 ease-in-out hover:scale-110 hover:drop-shadow-lg"
  >
    <div class="flex h-full w-full items-center space-x-5 bg-quinary p-3">
      <div>
        <div
          :ref="'hide_' + artist.name"
          class="absolute z-50 min-h-[3.5rem] min-w-[3.5rem] rounded-full bg-primary transition-all duration-1000 ease-in-out"
        ></div>
        <img
          class="shadowCard h-14 w-14 rounded-full object-cover"
          loading="lazy"
          :src="artist.image"
          :alt="artist.name + 's picture'"
          @load="imageLoaded"
        />
      </div>
      <div>
        <h2 class="text-lg font-bold">{{ artist.name }}'s news</h2>
        <p class="text-xs">{{ message }}</p>
      </div>
    </div>
    <div class="flex items-center bg-quaternary px-3">
      <p
        v-if="!isDatePassed(date)"
        class="my-auto whitespace-nowrap text-xl font-bold"
      >
        D-{{ countDays(date) }}
      </p>
      <p
        v-if="checkDate(date)"
        class="my-auto whitespace-nowrap font-medium text-primary"
      >
        Today
      </p>
      <p
        v-if="!checkDate(date) && isDatePassed(date)"
        class="my-auto whitespace-nowrap font-medium text-primary"
      >
        Outed
      </p>
    </div>
  </NuxtLink>
</template>

<script>
import moment from 'moment-timezone'
export default {
  props: {
    verified: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    artist: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  methods: {
    imageLoaded() {
      const hide = this.$refs['hide_' + this.artist.name]
      hide?.classList.add('opacity-0')
    },

    checkDate(date) {
      return moment(new Date(date)).isSame(moment(), 'day')
    },

    // compter le nombre de jour entre aujourd'hui et la date de sortie
    countDays(date) {
      return moment(new Date(date)).diff(moment(), 'days')
    },

    // vérifier si la date est passé return boolean
    isDatePassed(date) {
      return moment(new Date(date)).isBefore(moment())
    },
  },
}
</script>

<style>
.shadowCard {
  --tw-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.3);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
