<template>
  <div
    :id="`artist-card-${id}`"
    class="text-tertiary max-w-[10rem] aspect-square"
  >
    <NuxtLink :to="`/artist/${id}`">
      <div
        :ref="'hide_' + name"
        class="
          rounded-full
          object-cover
          min-w-[10rem] min-h-[10rem]
          transition-all
          duration-1000
          ease-in-out
          absolute
          z-10
          bg-primary
        "
      ></div>
      <img
        :src="image"
        :alt="name"
        @load="imageLoaded"
        loading="lazy"
        class="
          rounded-full
          object-cover
          aspect-square
          max-h-[10rem]
          min-h-[10rem]
        "
      />
    </NuxtLink>
    <NuxtLink
      :to="`/artist/${id}`"
      class="w-full flex flex-col justify-center items-center"
    >
      <h2 class="font-semibold text-center hover-underline-animation">
        {{ name }}
      </h2>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "artistCard",

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
  },

  methods: {
    imageLoaded() {
      const hide = this.$refs["hide_" + this.name];
      hide.classList.add("opacity-0");
    },
  },
};
</script>