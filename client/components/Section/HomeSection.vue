<template>
  <section class="space-y-5 animate__animated animate__fadeInUp">
    <p
      class="
        text-xl
        sm:text-2xl
        lg:text-4xl
        text-tertiary
        flex
        animate__animated animate__fadeIn
      "
    >
      {{ title }}
    </p>
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