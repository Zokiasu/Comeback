<template>
  <div class="space-y-5 p-5 text-tertiary">
    <cb-up-artist
      v-for="(artist, index) in artistList"
      :id="artist.id"
      :key="`artist_${index}`"
      :id-pending="artist.idPending"
      :name="artist.name"
      :type="artist.type"
      :image="artist.image"
      :description="artist.description"
      :styles="artist.styles"
      :platforms="artist.platforms"
      :socials="artist.socials"
      :members="artist.members"
      :groups="artist.groups"
      @accept="verify(artist, index)"
      @reject="reject(artist, index)"
    />
  </div>
</template>

<script>
export default {
  name: 'UpdateArtist',
  layout: 'dashboard',

  async asyncData({ $fire }) {
    const firstStepArtist = $fire.functions.httpsCallable(
      'getPendingUpdateArtist'
    )
    const firstStepGroupArtist = $fire.functions.httpsCallable(
      'getGroupsPendingUpdateArtist'
    )
    const firstStepMembersArtist = $fire.functions.httpsCallable(
      'getMembersPendingUpdateArtist'
    )

    const secondStepArtist = await firstStepArtist().then(async (res) => {
      await res.data.artists.map(async (element) => {
        firstStepMembersArtist({ idPending: element.idPending }).then((res) => {
          element.members = res.data.members
          firstStepGroupArtist({ idPending: element.idPending }).then(
            (res2) => {
              element.groups = res2.data.groups
            }
          )
        })
      })
      console.log(res.data.artists)
      return res.data.artists
    })
    return { artistList: secondStepArtist }
  },

  methods: {
    async verify(artist, index) {
      const idPending = artist.idPending
      const updateArtist =
        this.$fire.functions.httpsCallable('updateArtistById')
      const deleteArtist = this.$fire.functions.httpsCallable(
        'deletePendingUpdateArtist'
      )
      await this.updateGroups(artist, index).then(async (res) => {
        await this.updateMembers(artist, index).then(async (res) => {
          delete artist.idPending
          delete artist.source
          updateArtist(artist).then((res) => {
            deleteArtist({ idPending }).then((res) => {
              this.artistList.splice(index, 1)
            })
          })
        })
      })
    },

    async updateGroups(artist, index) {
      new Promise((resolve, reject) => {
        const deleteGroupFromArtist =
          this.$fire.functions.httpsCallable('deleteGroupsArtist')
        const getActualGroups =
          this.$fire.functions.httpsCallable('getGroupsArtist')
        getActualGroups({ id: artist.id }).then(async (res) => {
          if (res.data.length) {
            await res.data.map(async (element) => {
              deleteGroupFromArtist({ id: artist.id, group: element }).then(
                async (res2) => {
                  const addGroupsArtist =
                    this.$fire.functions.httpsCallable('addGroupsArtist')
                  await artist.groups?.map(async (element) => {
                    await addGroupsArtist({ id: artist.id, group: element })
                  })
                  delete artist.groups
                }
              )
            })
            resolve('Resolved')
          } else {
            const addGroupsArtist =
              this.$fire.functions.httpsCallable('addGroupsArtist')
            await artist.groups?.map(async (element) => {
              await addGroupsArtist({ id: artist.id, group: element })
            })
            delete artist.groups
            resolve('Resolved')
          }
        })
      })
    },

    async updateMembers(artist, index) {
      new Promise((resolve, reject) => {
        const deleteMembersFromArtist = this.$fire.functions.httpsCallable(
          'deleteMembersArtist'
        )
        const getActualMembers =
          this.$fire.functions.httpsCallable('getMembersArtist')
        getActualMembers({ id: artist.id }).then(async (res) => {
          if (res.data.length) {
            await res.data.map(async (element) => {
              deleteMembersFromArtist({ id: artist.id, member: element }).then(
                async (res2) => {
                  const addMembersArtist =
                    this.$fire.functions.httpsCallable('addMembersArtist')
                  await artist.members?.map(async (element) => {
                    await addMembersArtist({ id: artist.id, member: element })
                  })
                  delete artist.members
                }
              )
            })
          } else {
            const addMembersArtist =
              this.$fire.functions.httpsCallable('addMembersArtist')
            await artist.members?.map(async (element) => {
              await addMembersArtist({ id: artist.id, member: element })
            })
            delete artist.members
          }
        })
      })
    },

    async delete(artist, index) {
      const deleteArtist = this.$fire.functions.httpsCallable(
        'deletePendingUpdateArtist'
      )
      deleteArtist({ idPending: artist.idPending }).then((res) => {
        this.artistList.splice(index, 1)
      })
    },

    reject(artist, index) {
      const deleteArtist = this.$fire.functions.httpsCallable(
        'deletePendingUpdateArtist'
      )
      deleteArtist({ idPending: artist.idPending })
      this.artistList.splice(index, 1)
    },
  },
}
</script>
