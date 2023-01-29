<template>
  <div :id="`artist-card-${id}`" class="aspect-square max-w-[10rem]">
    <NuxtLink :to="`/artist/${id}`">
      <div
        :ref="'hide_' + name"
        class="
          absolute
          z-10
          rounded-full
          bg-primary
          object-cover
          transition-all
          duration-1000
          ease-in-out
        "
        :class="dimension"
      ></div>
      <img
        :src="image"
        :alt="name"
        loading="lazy"
        class="aspect-square rounded-full object-cover mx-auto"
        :class="dimension"
        @load="imageLoaded"
      />
    </NuxtLink>
    <NuxtLink
      :to="`/artist/${id}`"
      class="flex w-full flex-col items-center justify-center"
    >
      <h2 class="hover-underline-animation text-center font-semibold truncate">
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
      default: 'min-h-[10rem] min-w-[10rem]',
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
