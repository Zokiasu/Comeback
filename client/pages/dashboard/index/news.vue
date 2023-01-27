<template>
  <div class="space-y-5 py-5 px-10">
    <section v-if="news.length < 1">
      <p class="flex bg-quaternary w-full justify-center rounded py-5 text-xl">
        No Release found.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NewsList',

  data() {
    return {
      search: '',
      news: [],
      maxObjectDisplay: 20,
      enough: false,
    }
  },
}
</script>
