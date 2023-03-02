<template>
  <section class="space-y-5 p-5">
    <dashboard-new-artist-card />
  </section>
</template>

<script>
export default {
  name: 'NewArtist',
  layout: 'dashboard',

  data() {
    return {
      artistList: [],
    }
  },

  async mounted() {
    await this.fetch()
  },

  methods: {
    async fetch() {
      this.artistList = await this.$fire.firestore
        .collection('updateArtistPending')
        .get()
        .then((snapshot) => {
          const artistList = []
          snapshot.forEach((doc) => {
            artistList.push(doc.data())
          })
          return artistList
        })
    },
    verify(idArtist, index) {
      const updateArtist =
        this.$fire.functions.httpsCallable('updateArtistById')
      updateArtist({ id: idArtist, verified: true })
      this.artistList.splice(index, 1)
    },

    reject(idArtist, index) {
      const deleteArtist = this.$fire.functions.httpsCallable('deleteArtist')
      deleteArtist({ id: idArtist })
      this.artistList.splice(index, 1)
    },
  },
}
</script>
