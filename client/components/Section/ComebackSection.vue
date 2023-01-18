<template>
  <home-section title="Comeback">
    <div class="flex flex-wrap gap-5 w-full justify-center">
      <NewsCard
        v-for="news in newsList"
        :key="news.id"
        :verified="news.verified"
        :message="news.message"
        :date="news.date"
        :artist="news.artist"
        :user="news.user"
      />
    </div>
  </home-section>
</template>

<script>
import HomeSection from "./HomeSection.vue";
export default {
  name: "ComebackSection",

  props: {
    newsList: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    HomeSection,
  },
};
</script>