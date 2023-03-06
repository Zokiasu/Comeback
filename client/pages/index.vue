<template>
  <div>
    <section
      class="animate__animated animate__fadeInDown relative px-10 w-full flex flex-col justify-center h-screen sm:h-[60vh] bg-cover bg-center bg-no-repeat bg-[url('https://www.blind-magazine.com/wp-content/uploads/2021/12/comment-photographier-un-concert-fr-1536x864.jpg.webp')]"
    >
      <div class="absolute inset-0 bg-black/60"></div>
      <div class="z-10 space-y-1.5">
        <p class="text-5xl sm:text-[2.5rem] md:text-6xl font-bold">
          Don't miss any <span class="text-primary">Comeback</span>
        </p>
        <p>Track every next release by your favorite artists</p>
      </div>
      <p class="absolute bottom-5 left-0 right-0 sm:hidden">
        <icons-arrow-down class="animate-bounce w-5 h-5 mx-auto" />
      </p>
    </section>

    <section
      v-if="newRelease.length > 0"
      class="animate__animated animate__fadeInUp px-10 py-10 lg:py-14 space-y-5 lg:container lg:mx-auto lg:px-0"
    >
      <p class="text-2xl md:text-3xl font-bold">Released this week</p>
      <div class="flex gap-5 overflow-hidden overflow-x-scroll thumbHide pb-5">
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
          class="flex-1"
        />
      </div>
    </section>

    <section
      v-if="newsList.length > 0"
      class="animate__animated animate__fadeInUp bg-primary/70 w-full space-y-5 md:space-y-8 p-5 py-10 lg:pb-18"
    >
      <p class="text-2xl md:text-3xl text-center font-bold">
        Comeback Reported
      </p>
      <div
        class="container mx-auto grid gap-5 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <NewsCard
          v-for="news in newsList"
          :key="news.id"
          :message="news.message"
          :date="news.date"
          :artist="news.artist"
        />
      </div>
    </section>

    <section
      v-if="newArtist.length > 0"
      class="animate__animated animate__fadeInUp container mx-auto px-5 md:pl-5 py-5 2xl:px-0 md:py-10 lg:py-14 space-y-5"
    >
      <p class="text-2xl md:text-3xl font-bold">Last Artist Added</p>
      <div
        class="animate__animated animate__fadeInUp flex flex-wrap gap-5 items-center justify-evenly lg:items-start lg:justify-between"
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
    </section>
  </div>
</template>

<script>
import IconsArrowDown from '~/components/Icons/IconsArrowDown.vue'
export default {
  components: { IconsArrowDown },
  data() {
    return {
      newArtist: [],
      newRelease: [],
      newsList: [],
    }
  },

  // eslint-disable-next-line require-await
  async mounted() {
    this.fetch()
  },

  methods: {
    async fetchNews() {
      const date = new Date()
      date.setDate(date.getDate() - 3)
      const startDate = this.$fireModule.firestore.Timestamp.fromDate(date)

      await this.$fire.firestore
        .collection('news')
        .where('date', '>=', startDate)
        .orderBy('date', 'asc')
        .limit(16)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const news = doc.data()
            news.id = doc.id
            news.date = new Date(doc.data().date.seconds * 1000)
            this.newsList.push(news)
          })
        })
    },

    async fetchArtist(startDate) {
      const newArtist = await this.$fire.firestore
        .collection('artists')
        .where('verified', '==', true)
        .where('createdAt', '<=', startDate)
        .orderBy('createdAt', 'desc')
        .limit(8)
        .get()
        .then((snapshot) => {
          return snapshot.docs.map((doc) => doc.data())
        })
      this.newArtist = newArtist
    },

    async fetchRelease() {
      const date = new Date()
      date.setDate(date.getDate() - 7)
      const startDate = this.$fireModule.firestore.Timestamp.fromDate(date)

      await this.$fire.firestore
        .collection('releases')
        .where('date', '>=', startDate)
        .orderBy('date', 'desc')
        // .limit(15)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const release = doc.data()
            release.id = doc.id
            release.date = new Date(doc.data().date.seconds * 1000)
            this.newRelease.push(release)
          })
        })
    },

    async fetch() {
      const startDate = this.$fireModule.firestore.Timestamp.fromDate(
        new Date()
      )
      await this.fetchRelease(startDate)
      await this.fetchNews()
      await this.fetchArtist(startDate)
    },
  },
}
</script>

<style>
/* ne pas afficher le thumb scroll */
.thumbHide::-webkit-scrollbar {
  display: none;
}
</style>
