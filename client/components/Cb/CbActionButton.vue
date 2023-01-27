<template>
  <button
    class="
      bg-primary
      text-center
      rounded
      px-3
      py-2
      transition
      duration-500
      ease-in-out
      hover:-translate-y-1
      hover:scale-110
      hover:bg-primary/30
      hover:font-semibold
    "
  >
    <p>Button</p>
  </button>
</template>

<script>
export default {
  name: 'CbActionButton',
  props: {
    text: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
}
</script>