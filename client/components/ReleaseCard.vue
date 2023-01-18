<template>
  <div class="space-y-1 text-white max-w-[10rem]">
    <NuxtLink :to="`/release/${id}`">
      <div class="relative group">
        <div class="bg-gray-500 rounded-md">
          <img
            :src="image"
            :alt="name"
            loading="lazy"
            class="
              rounded-md
              object-cover
              aspect-square
              bg-gray-500
              drop-shadow-2xl
              w-full
              max-h-[10rem]
              min-h-[10rem]
            "
          />
        </div>
        <div
          v-if="displayDate"
          class="
            absolute
            top-2
            right-1.5
            px-2
            py-0.5
            rounded
            text-white
            bg-gray-500 bg-opacity-80
            invisible
            group-hover:visible
          "
        >
          <p class="text-center text-xs">
            {{
              new Date(date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })
            }}
          </p>
        </div>
        <div
          class="
            absolute
            bottom-1
            left-1
            px-2
            py-0.5
            rounded
            text-white
            bg-gray-500/70
            invisible
            group-hover:visible
          "
        >
          <p class="text-center text-xs">{{ type }}</p>
        </div>
      </div>
    </NuxtLink>
    <div>
      <p class="truncate font-semibold">{{ name }}</p>
      <div class="text-xs md:text-sm">
        <NuxtLink :to="`/artist/${artists.id}`" class="mt-1">
          <p v-if="artists" class="truncate hover-underline-animation">
            {{ artists.name }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment-timezone";
export default {
  name: "releaseCard",

  props: {
    id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    date: {
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    artists: {
      type: Object,
    },
    displayDate: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    validationDate() {
      return this.checkDate();
    },
  },

  methods: {
    checkDate() {
      return moment(new Date(this.date)).isAfter(new Date());
    },
  },
};
</script>