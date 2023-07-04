<template>
  <home-section title="Artist Added">
    <div
      class="animate__animated animate__fadeInUp flex flex-wrap justify-evenly gap-2 md:justify-evenly md:gap-5"
    >
      <LazyArtistCard
        v-for="artist in newArtist"
        :id="artist.id"
        :key="artist.id"
        :image="artist.image"
        :name="artist.name"
        :type="artist.type"
      />
    </div>
  </home-section>
</template>

<script>
import HomeSection from './HomeSection.vue'
export default {
  name: 'LastArtistSection',

  components: {
    HomeSection,
  },

  props: {
    newArtist: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
