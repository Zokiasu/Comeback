<template>
  <home-section title="Artist Added">
    <div class="flex flex-wrap gap-2 md:gap-5 justify-evenly md:justify-evenly">
      <ArtistCard
        v-for="artist in newArtist"
        :key="artist.id"
        :image="artist.image"
        :name="artist.name"
        :id="artist.id"
        :type="artist.type"
      />
    </div>
  </home-section>
</template>

<script>
import HomeSection from "./HomeSection.vue";
export default {
  name: "LastArtistSection",

  props: {
    newArtist: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    HomeSection,
  },
};
</script>