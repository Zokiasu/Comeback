<template>
  <div class="p-5 lg:p-10 overflow-hidden space-y-5 lg:space-y-10">
    <comeback-section
      class="section"
      v-if="newsList.length > 0"
      :newsList="newsList"
    />
    <last-releases-section
      class="section"
      v-if="newRelease.length > 0"
      :newRelease="newRelease"
    />
    <LastArtistSection
      class="section"
      v-if="newArtist.length > 0"
      :newArtist="newArtist"
    />
  </div>
</template>

<script>
import ComebackSection from "~/components/Section/ComebackSection.vue";
import LastReleasesSection from "~/components/Section/LastReleasesSection.vue";
import LastArtistSection from "~/components/Section/LastArtistSection.vue";

export default {
  components: { ComebackSection, LastReleasesSection, LastArtistSection },

  data() {
    return {
      newArtist: [],
      newRelease: [],
      newsList: [],
    };
  },

  head() {
    return {
      title: "Home",
    };
  },

  created() {},

  async mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const startDate = this.$fireModule.firestore.Timestamp.fromDate(
        new Date()
      );

      await this.$fire.firestore
        .collection("news")
        // .where("date", ">=", startDate)
        .orderBy("date", "desc")
        .limit(9)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const news = doc.data();
            news.id = doc.id;
            news.date = new Date(doc.data().date.seconds * 1000);
            this.newsList.push(news);
          });
        });

      let newArtist = await this.$fire.firestore
        .collection("artists")
        .where("createdAt", "<=", startDate)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get()
        .then((snapshot) => {
          return snapshot.docs.map((doc) => doc.data());
        });
      this.newArtist = newArtist;

      await this.$fire.firestore
        .collection("releases")
        .where("date", "<=", startDate)
        .orderBy("date", "desc")
        .limit(10)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const release = doc.data();
            release.id = doc.id;
            release.date = new Date(doc.data().date.seconds * 1000);
            this.newRelease.push(release);
          });
        });
    },
  },
};
</script>