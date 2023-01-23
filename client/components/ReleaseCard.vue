<template>
  <div class="max-w-[10rem] space-y-1 text-tertiary">
    <NuxtLink :to="`/release/${id}`">
      <div class="group relative">
        <div class="rounded-md bg-gray-500">
          <div
            :ref="'hide_' + name"
            class="bg-bg-primary absolute z-10 aspect-square max-h-[10rem] min-h-[10rem] w-full rounded-md transition-all duration-1000 ease-in-out"
          ></div>
          <img
            :src="image"
            :alt="name"
            loading="lazy"
            class="aspect-square max-h-[10rem] min-h-[10rem] w-full rounded-md object-cover drop-shadow-2xl"
            @load="imageLoaded"
          />
        </div>
        <div
          v-if="displayDate"
          class="invisible absolute top-2 right-1.5 rounded bg-gray-500 bg-opacity-80 px-2 py-0.5 text-tertiary group-hover:visible"
        >
          <p class="text-center text-xs">
            {{
              new Date(date).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })
            }}
          </p>
        </div>
        <div
          class="invisible absolute bottom-1 left-1 rounded bg-gray-500/70 px-2 py-0.5 text-tertiary group-hover:visible"
        >
          <p class="text-center text-xs">{{ type }}</p>
        </div>
      </div>
    </NuxtLink>
    <div>
      <p class="truncate font-semibold">{{ name }}</p>
      <div class="text-xs md:text-sm">
        <NuxtLink :to="`/artist/${artists.id}`" class="mt-1">
          <p v-if="artists" class="hover-underline-animation truncate">
            {{ artists.name }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
export default {
  name: 'ReleaseCard',

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
      return this.checkDate()
    },
  },

  methods: {
    checkDate() {
      return moment(new Date(this.date)).isAfter(new Date())
    },
    imageLoaded() {
      const hide = this.$refs['hide_' + this.name]
      hide?.classList.add('opacity-0')
    },
  },
}
</script>
