<template>
  <NuxtLink
    :to="`/artist/${artist.id}`"
    class="
      flex
      w-full
      overflow-hidden
      rounded-lg
      transition-all
      duration-500
      ease-in-out
      hover:scale-110 hover:drop-shadow-lg
    "
  >
    <div class="flex h-full w-full items-center space-x-5 bg-quinary p-3">
      <div>
        <div
          :ref="'hide_' + artist.name"
          class="
            absolute
            z-50
            min-h-[3.5rem] min-w-[3.5rem]
            rounded-full
            bg-primary
            transition-all
            duration-1000
            ease-in-out
          "
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
        <h2 class=" font-semibold">{{ artist.name }}'s news</h2>
        <p class="text-xs">{{ message }}</p>
      </div>
    </div>
    <div class="flex justify-center text-center items-center bg-quaternary px-3 min-w-[5rem]">
      <p
        v-if="!isDatePassed(date) && !isSameDate(date)"
        class="my-auto whitespace-nowrap text-xl font-bold"
      >
        D-{{ daysUntil(date) }}
      </p>
      <p
        v-if="isSameDate(date)"
        class="my-auto whitespace-nowrap font-medium text-primary"
      >
        Today
      </p>
      <p
        v-if="!isSameDate(date) && isDatePassed(date)"
        class="my-auto whitespace-nowrap font-medium text-primary"
      >
        Outed
      </p>
    </div>
  </NuxtLink>
</template>

<script>
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
    daysUntil(futureDate) {
      // Récupère la date d'aujourd'hui
      const today = new Date()

      // Récupère la date future
      const future = new Date(futureDate)

      // Calcule la différence en ms entre les deux dates
      const differenceInTime = future.getTime() - today.getTime()

      // Convertit la différence en ms en nombre de jours
      const differenceInDays = differenceInTime / (1000 * 3600 * 24)

      // Retourne le nombre de jours restants
      return Math.ceil(differenceInDays)
    },

    isDatePassed(date) {
      // Récupère la date d'aujourd'hui en timestamp
      const today = new Date().getTime()

      // Convertit la date entrée en paramètre en timestamp
      const inputDate = Date.parse(date)

      // Compare les deux timestamps
      if (isNaN(inputDate)) {
        throw new TypeError('Invalid date format')
      }
      return inputDate < today
    },

    isSameDate(date) {
      // Récupère la date d'aujourd'hui en timestamp
      const today = new Date()
      // Convertit la date entrée en paramètre en timestamp
      const inputDate = new Date(Date.parse(date))

      if (isNaN(inputDate)) {
        throw new TypeError('Invalid date format')
      }
      // Compare les deux timestamps
      return (
        inputDate.getFullYear() === today.getFullYear() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getDate() === today.getDate()
      )
    },

    imageLoaded() {
      const hide = this.$refs['hide_' + this.artist.name]
      hide?.classList.add('opacity-0')
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
