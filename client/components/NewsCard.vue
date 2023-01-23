<template>
  <NuxtLink
    :to="`/artist/${artist.id}`"
    class="
      overflow-hidden
      rounded-lg
      flex
      w-full
      text-tertiary
      transition-all
      ease-in-out
      duration-500
      hover:scale-110 hover:drop-shadow-lg
    "
  >
    <div class="bg-gray-500 p-3 h-full w-full flex items-center space-x-5">
      <div>
        <div
          :ref="'hide_' + artist.name"
          class="
            rounded-full
            min-w-[3.5rem] min-h-[3.5rem]
            transition-all
            duration-1000
            ease-in-out
            absolute
            z-50
            bg-green-500
          "
        ></div>
        <img
          class="w-14 h-14 rounded-full object-cover shadowCard"
          loading="lazy"
          @load="imageLoaded"
          :src="artist.image"
          :alt="artist.name + 's picture'"
        />
      </div>
      <div>
        <h2 class="font-bold text-lg">{{ artist.name }}'s news</h2>
        <p class="text-xs">{{ message }}</p>
      </div>
    </div>
    <div class="bg-gray-700 px-3 flex items-center">
      <p
        v-if="!isDatePassed(date)"
        class="font-bold text-xl whitespace-nowrap my-auto"
      >
        D-{{ countDays(date) }}
      </p>
      <p
        v-if="checkDate(date)"
        class="font-medium whitespace-nowrap my-auto text-red-500"
      >
        Today
      </p>
      <p
        v-if="!checkDate(date) && isDatePassed(date)"
        class="font-medium whitespace-nowrap my-auto text-red-500"
      >
        Outed
      </p>
    </div>
  </NuxtLink>
</template>

<script>
import moment from "moment-timezone";
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
      const hide = this.$refs["hide_" + this.artist.name];
      hide.classList.add("opacity-0");
    },

    checkDate(date) {
      return moment(new Date(date)).isSame(moment(), "day");
    },

    // compter le nombre de jour entre aujourd'hui et la date de sortie
    countDays(date) {
      return moment(new Date(date)).diff(moment(), "days");
    },

    // vérifier si la date est passé return boolean
    isDatePassed(date) {
      return moment(new Date(date)).isBefore(moment());
    },
  },
};
</script>

<style>
.shadowCard {
  --tw-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.3);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>