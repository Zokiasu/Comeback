<template>
  <section class="space-y-5 p-5 text-tertiary">
    <div
      v-for="(artist, index) in artistList"
      :key="artist.id"
      class="space-y-2 rounded bg-black-four p-5"
    >
      <h2 class="text-xl font-semibold">{{ artist.name }}</h2>
      <div class="grid grid-cols-2 gap-5">
        <img :src="artist.image" :alt="artist.name" class="rounded" />
        <div class="flex flex-col justify-between">
          <p>{{ artist.description }}</p>
          <div class="flex w-full justify-end gap-2">
            <button
              class="hover:bg-bg-primary rounded bg-red-500 px-5 py-2 font-semibold transition-all duration-300 ease-in-out"
              @click="reject(artist.id, index)"
            >
              Reject
            </button>
            <button
              class="rounded bg-green-500 px-5 py-2 font-semibold transition-all duration-300 ease-in-out hover:bg-green-700"
              @click="verify(artist.id, index)"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewArtist',
  layout: 'dashboard',

  async asyncData({ $fire }) {
    const firstStepArtist = $fire.functions.httpsCallable(
      'getPendingCreateArtist'
    )
    const secondStepArtist = await firstStepArtist()
    const artistList = secondStepArtist.data.artists

    return { artistList }
  },

  methods: {
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
