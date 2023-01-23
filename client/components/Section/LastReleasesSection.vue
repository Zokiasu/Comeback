<template>
  <home-section title="Last Releases">
    <div
      class="animate__animated animate__fadeInUp flex flex-wrap justify-center gap-2 md:justify-evenly md:gap-5"
    >
      <release-card
        v-for="release in newRelease"
        :id="release.id"
        :key="release.id"
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
import HomeSection from './HomeSection.vue'
export default {
  name: 'LastReleasesSection',

  components: {
    HomeSection,
  },

  props: {
    newRelease: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
