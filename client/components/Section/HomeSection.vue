<template>
  <section class="space-y-5">
    <p class="text-xl sm:text-2xl lg:text-4xl text-white flex">{{ title }}</p>
    <slot />
  </section>
</template>

<script>
export default {
  name: "HomeSection",

  props: {
    title: {
      type: String,
      default: "Title Section",
    },
  },
};
</script>