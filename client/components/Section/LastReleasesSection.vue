<template>
  <home-section title="Last Releases">
    <div class="flex flex-wrap gap-2 md:gap-5 justify-center md:justify-evenly">
      <ReleaseCard
        v-for="release in newRelease"
        :key="release.id"
        :id="release.id"
        :image="release.image"
        :date="release.date"
        :name="release.name"
        :type="release.type"
        :artists="{ id: release.artistsId, name: release.artistsName }"
        display-date
      />
    </div>
  </home-section>
</template>

<script>
import HomeSection from "./HomeSection.vue";
export default {
  name: "LastReleasesSection",

  props: {
    newRelease: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    HomeSection,
  },
};
</script>