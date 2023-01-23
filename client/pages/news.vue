<template>
  <div class="flex flex-col space-y-10 px-10 py-5">
    <div class="flex w-full justify-center">
      <h2 class="text-4xl text-tertiary">Lastest News</h2>
    </div>
    <transition-group
      name="object"
      class="inner flex w-full flex-wrap justify-center overflow-x-scroll"
    >
      <NewsCard
        v-for="element in newsList"
        :key="element.id"
        class="m-2"
        :element="element"
      />
    </transition-group>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const newsList = await $axios.$get(
      'https://comeback-api.herokuapp.com/infos?sortby=date:desc'
    )
    return { newsList }
  },
  data() {
    return {
      newsList: [],
    }
  },
}
</script>

<style>
.object-enter-active,
.object-leave-active {
  transition-duration: 0.4s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.object-enter {
  opacity: 0;
  transform: translate(0, -2em);
}

.object-leave-active {
  opacity: 0;
  transform: translate(0, -2em);
}
</style>
