<template>
  <div class="p-5 lg:p-10 overflow-hidden space-y-5 lg:space-y-10">
    <comeback-section :newsList="newsList" />
    <last-releases-section :newRelease="newRelease" />
    <last-artist-section :newArtist="newArtist" />
  </div>
</template>

<script>
import ScrollReveal from "scrollreveal";
import ComebackSection from "~/components/Section/ComebackSection.vue";
import LastReleasesSection from "~/components/Section/LastReleasesSection.vue";
import LastArtistSection from "~/components/Section/LastArtistSection.vue";

export default {
  components: { ComebackSection, LastReleasesSection, LastArtistSection },
  name: "App",

  async mounted() {
    ScrollReveal().reveal(".section", {
      interval: 300,
      distance: "1000%",
      origin: "bottom",
      opacity: null,
    });
  },

  async asyncData({ $fire, $fireModule }) {
    const startDate = $fireModule.firestore.Timestamp.fromDate(new Date());

    const newsList = [];
    await $fire.firestore
      .collection("news")
      .where("date", ">=", startDate)
      .orderBy("date", "asc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const news = doc.data();
          news.id = doc.id;
          news.date = new Date(doc.data().date.seconds * 1000);
          newsList.push(news);
        });
      });

    let newArtist = await $fire.firestore
      .collection("artists")
      .where("createdAt", "<=", startDate)
      .orderBy("createdAt", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => doc.data());
      });

    const newRelease = [];
    await $fire.firestore
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
          newRelease.push(release);
        });
      });

    return {
      newArtist,
      newRelease,
      newsList,
    };
  },
};
</script>