<template>
  <div class="space-y-5 p-5">
    <dashboard-artist-updated
      v-for="(artist, index) in artistList"
      :id="artist.id"
      :key="`artist_updated_${index}`"
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
    const artistList = await $fire.firestore
      .collection('updateArtistPending')
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data())
      })

    artistList.forEach(async (artist) => {
      if (artist.type === 'group') {
        artist.members = await $fire.firestore
          .collection('updateArtistPending')
          .doc(artist.id)
          .collection('members')
          .get()
          .then((querySnapshot) => {
            return querySnapshot.docs.map((doc) => doc.data())
          })
      }

      artist.groups = await $fire.firestore
        .collection('updateArtistPending')
        .doc(artist.id)
        .collection('groups')
        .get()
        .then((querySnapshot) => {
          return querySnapshot.docs.map((doc) => doc.data())
        })
      console.log('artist', artist)
    })

    return {
      artistList,
    }
  },

  methods: {
    async verify(artist, index) {
      console.log('verify')

      const groups = artist.groups
      const members = artist.members

      console.log('members', members)
      console.log('groups', groups)
      // recupère les données originel de l'artiste
      await this.$fire.firestore
        .collection('artists')
        .doc(artist.id)
        .get()
        .then(async (doc) => {
          // on vérifie si il y a une modification sur les membres
          if (members) {
            console.log('members to update')
            this.firestoreAddMemberToGroup(
              doc.data().id,
              doc.data().name,
              doc.data().image,
              doc.data().type,
              members
            )
          }
          // on vérifie si il y a une modification sur les groupes
          if (groups) {
            console.log('groups to update')
            this.firestoreAddGroupToArtist(
              doc.data().id,
              doc.data().name,
              doc.data().image,
              doc.data().type,
              groups
            )
          }
          // on met à jour les données de l'artiste
          await this.$fire.firestore
            .collection('artists')
            .doc(artist.id)
            .update(artist)
            .then(async () => {
              await this.$fire.firestore
                .collection('updateArtistPending')
                .doc(artist.id)
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
      console.log('firestoreAddMemberToGroup')
      // Récupération des membres actuels de l'artiste
      const currentMembers = await this.$fire.firestore
        .collection('artists')
        .doc(artistId)
        .collection('members')
        .get()

      // Tableau contenant les membres actuels
      const currentMembersArray = currentMembers.docs.map((doc) => doc.data())

      // Parcours des membres actuels
      currentMembersArray.forEach(async (currentMember) => {
        // Vérification si le membre actuel est présent dans les nouveaux membres
        if (!members.some((member) => member.id === currentMember.id)) {
          console.log('member to delete', currentMember.name)
          // Suppression du membre de la base de données
          await this.$fire.firestore
            .collection('artists')
            .doc(artistId)
            .collection('members')
            .doc(currentMember.id)
            .delete()
            .then(async () => {
              // Suppression du groupe du membre
              await this.$fire.firestore
                .collection('artists')
                .doc(currentMember.id)
                .collection('groups')
                .doc(artistId)
                .delete()
            })
        } else if (members.length === 0) {
          // Si la liste ne contient aucun membre supprimer tous les membres existants
          await this.$fire.firestore
            .collection('artists')
            .doc(artistId)
            .collection('members')
            .doc(currentMember.id)
            .delete()
            .then(async () => {
              // Suppression du groupe du membre
              await this.$fire.firestore
                .collection('artists')
                .doc(currentMember.id)
                .collection('groups')
                .doc(artistId)
                .delete()
            })
        }
      })

      // Parcours des nouveaux membres
      members.forEach(async (member) => {
        // Vérification si le membre nouveau n'est pas présent dans les membres actuels
        if (
          !currentMembersArray.some(
            (currentMember) => currentMember.id === member.id
          )
        ) {
          // Ajout du membre à la base de données
          await this.$fire.firestore
            .collection('artists')
            .doc(artistId)
            .collection('members')
            .doc(member.id)
            .set(member)
            .then(async () => {
              // ajout du groupe au membre
              const members = {
                id: artistId,
                name: artistName,
                image: artistImage,
                type: artistType,
              }
              await this.$fire.firestore
                .collection('artists')
                .doc(member.id)
                .collection('groups')
                .doc(artistId)
                .set(members)
            })
        }
      })
    },

    async firestoreAddGroupToArtist(
      artistId,
      artistName,
      artistImage,
      artistType,
      groups
    ) {
      console.log('firestoreAddGroupToArtist')
      // Récupération des groupes actuels de l'artiste
      const currentGroups = await this.$fire.firestore
        .collection('artists')
        .doc(artistId)
        .collection('groups')
        .get()

      // Tableau contenant les groupes actuels
      const currentGroupsArray = currentGroups.docs.map((doc) => doc.data())
      console.log('currentGroupsArray', currentGroupsArray)
      // Parcours des groupes actuels
      currentGroupsArray.forEach(async (currentGroup) => {
        // Vérification si le groupe actuel est présent dans les nouveaux groupes
        console.log('groups length', groups.length)
        if (!groups.some((group) => group.id === currentGroup.id)) {
          // Suppression du groupe de la base de données
          await this.$fire.firestore
            .collection('artists')
            .doc(artistId)
            .collection('groups')
            .doc(currentGroup.id)
            .delete()
            .then(async () => {
              // Suppression du groupe du membre
              await this.$fire.firestore
                .collection('artists')
                .doc(currentGroup.id)
                .collection('members')
                .doc(artistId)
                .delete()
            })
        } else if (groups.length < 1) {
          console.log('group to delete', currentGroup.name)
          await this.$fire.firestore
            .collection('artists')
            .doc(artistId)
            .collection('groups')
            .doc(currentGroup.id)
            .delete()
            .then(async () => {
              // Suppression du groupe du membre
              await this.$fire.firestore
                .collection('artists')
                .doc(currentGroup.id)
                .collection('members')
                .doc(artistId)
                .delete()
            })
        }
      })

      // Parcours des nouveaux groupes
      groups.forEach(async (group) => {
        // Vérification si le groupe nouveau n'est pas présent dans les groupes actuels
        if (
          !currentGroupsArray.some(
            (currentGroup) => currentGroup.id === group.id
          )
        ) {
          // Ajout du groupe à la base de données
          await this.$fire.firestore
            .collection('artists')
            .doc(artistId)
            .collection('groups')
            .doc(group.id)
            .set(group)
            .then(async () => {
              // ajout du membre au groupe
              const members = {
                id: artistId,
                name: artistName,
                image: artistImage,
                type: artistType,
              }
              await this.$fire.firestore
                .collection('artists')
                .doc(group.id)
                .collection('members')
                .doc(artistId)
                .set(members)
            })
        }
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
