<template>
  <div class="space-y-5 py-5 px-10">
    <section v-if="news.length < 1">
      <p class="flex w-full justify-center rounded bg-quaternary py-5 text-xl">
        No Release found.
      </p>
    </section>
    <section v-else class="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
      <div v-for="(newsObject, index) in news" :key="newsObject.id" class="flex space-x-2">
        <news-card
          :artist="newsObject.artist"
          :message="newsObject.message"
          :date="newsObject.date"
        />
        <div>
          <button 
            class="h-full w-full bg-primary text-tertiary rounded-lg px-5 hover:bg-primary/70"
            @click="deleteNews(newsObject.id, index)"
          >
            Delete
          </button>
        </div>
      </div>
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
      enough: false,
    }
  },

  async mounted() {
    await this.fetch()
  },

  methods: {
    async fetch() {
      await this.$fire.firestore
        .collection('news')
        .orderBy('date', 'asc')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const news = doc.data()
            news.id = doc.id
            news.date = new Date(doc.data().date.seconds * 1000)
            this.news.push(news)
          })
        })
    },
    async deleteNews(newsId, index){
      await this.$fire.firestore
        .collection('news')
        .doc(newsId)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
          this.news.splice(index, 1)
        })
        .catch((error) => {
          console.error('Error removing document: ', error)
        })
    }
  },
}
</script>
