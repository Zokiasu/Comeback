<template>
  <div class="space-y-5 p-5">
    <dashboard-artist-updated
      v-for="(artist, index) in artistList"
      :id="artist.id"
      :key="`artist_updated_${index}`"
      :id-pending="artist.idPending"
      :id-youtube-music="artist.idYoutubeMusic"
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
      await res.data.artists.map((element) => {
        return firstStepMembersArtist({ idPending: element.idPending }).then(
          (res) => {
            element.members = res.data.members
            firstStepGroupArtist({ idPending: element.idPending }).then(
              (res2) => {
                element.groups = res2.data.groups
              }
            )
          }
        )
      })

      return res.data.artists
    })
    return { artistList: secondStepArtist }
  },

  methods: {
    async verify(artist, index) {
      const idPending = artist.idPending
      const groups = artist.groups
      const members = artist.members

      delete artist.idPending
      delete artist.source

      await this.$fire.firestore
        .collection('artists')
        .doc(artist.id)
        .get()
        .then(async (doc) => {
          if (members?.length) {
            this.firestoreAddMemberToGroup(
              doc.data().id,
              doc.data().name,
              doc.data().image,
              doc.data().type,
              members
            )
          }

          if (groups?.length) {
            this.firestoreAddGroupToMember(
              doc.data().id,
              doc.data().name,
              doc.data().image,
              doc.data().type,
              groups
            )
          }
          await this.$fire.firestore
            .collection('artists')
            .doc(artist.id)
            .update(artist)
            .then(async () => {
              await this.$fire.firestore
                .collection('updateArtistPending')
                .doc(idPending)
                .delete()
                .then(() => {
                  this.artistList.splice(index, 1)
                })
            })
        })
    },

    async firestoreAddMemberToGroup(
      artistId,
      artistName,
      artistImage,
      artistType,
      members
    ) {
      // ajouter les membres aux groupes
      await this.deleteMember(artistId)
      members.forEach(async (member) => {
        await this.$fire.firestore
          .collection('artists')
          .doc(artistId)
          .collection('members')
          .doc(member.id)
          .set(member)
          .then(async () => {
            const groupMembers = {
              id: artistId,
              name: artistName,
              image: artistImage,
              type: artistType,
            }
            await this.deleteGroup(member.id)
            await this.$fire.firestore
              .collection('artists')
              .doc(member.id)
              .collection('groups')
              .doc(artistId)
              .set(groupMembers)
          })
      })
    },

    async firestoreAddGroupToMember(
      artistId,
      artistName,
      artistImage,
      artistType,
      groups
    ) {
      await this.deleteGroup(artistId)
      groups.forEach(async (group) => {
        await this.$fire.firestore
          .collection('artists')
          .doc(artistId)
          .collection('groups')
          .doc(group.id)
          .set(group)
          .then(async () => {
            const members = {
              id: artistId,
              name: artistName,
              image: artistImage,
              type: artistType,
            }
            this.deleteMember(group.id)
            await this.$fire.firestore
              .collection('artists')
              .doc(group.id)
              .collection('members')
              .doc(artistId)
              .set(members)
          })
      })
    },

    async deleteGroup(artistId) {
      await this.$fire.firestore
        .collection('artists')
        .doc(artistId)
        .collection('groups')
        .delete()
    },

    async deleteMember(artistId) {
      await this.$fire.firestore
        .collection('artists')
        .doc(artistId)
        .collection('members')
        .delete()
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
