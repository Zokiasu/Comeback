<template>
  <div
    :id="`artist-card-${id}`"
    class="aspect-square max-w-[10rem] space-y-2 md:space-y-0"
  >
    <NuxtLink :to="`/artist/${id}`">
      <div
        :ref="'hide_' + name"
        class="absolute z-10 rounded-full bg-primary object-cover transition-all duration-1000 ease-in-out"
        :class="dimension"
      ></div>
      <img
        :src="image"
        :alt="name"
        loading="lazy"
        class="mx-auto aspect-square rounded-full object-cover"
        :class="dimension"
        @load="imageLoaded"
      />
    </NuxtLink>
    <NuxtLink
      :to="`/artist/${id}`"
      class="flex w-full flex-col items-center justify-center"
    >
      <h2
        class="text-xs md:text-base hover-underline-animation truncate text-center font-semibold"
      >
        {{ name }}
      </h2>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'ArtistCard',

  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    dimension: {
      type: String,
      default:
        'min-h-[5rem] min-w-[5rem] md:min-h-[10rem] md:min-w-[10rem] max-h-[5rem] max-w-[5rem] md:max-h-[10rem] md:max-w-[10rem]',
    },
  },

  methods: {
    imageLoaded() {
      const hide = this.$refs['hide_' + this.name]
      hide?.classList.add('opacity-0')
    },
  },
}
</script>
