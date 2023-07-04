<template>
  <section class="animate__animated animate__fadeInUp space-y-5">
    <p
      class="animate__animated animate__fadeIn flex text-xl font-semibold sm:text-2xl lg:text-4xl"
    >
      {{ title }}
    </p>
    <slot />
  </section>
</template>

<script>
export default {
  name: 'HomeSection',

  props: {
    title: {
      type: String,
      default: 'Title Section',
    },
  },
}
</script>
