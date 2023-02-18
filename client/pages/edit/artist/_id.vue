<template>
  <div class="flex flex-col p-5 sm:mx-auto container">
    <div class="mx-auto w-full rounded-lg bg-secondary p-5 lg:max-w-full">
      <h2 class="mb-3 text-3xl font-semibold">Edit Artist</h2>
      <div class="flex flex-wrap gap-5">
        <!-- Picture -->
        <div class="w-full">
          <label
            for="name"
            class="mb-2 block font-semibold uppercase tracking-wide"
          >
            Picture*
          </label>
          <div class="flex flex-wrap gap-5">
            <img
              :src="image"
              :alt="name"
              class="w-full rounded object-cover md:w-auto md:max-w-lg"
            />
            <button
              :disabled="isUploadingImage"
              type="button"
              class="h-full w-full rounded bg-primary py-2 px-4 md:w-auto"
              @click="launchImageFile"
            >
              Upload
            </button>
            <input
              ref="imageFile"
              type="file"
              accept="image/png, image/jpeg"
              class="hidden"
              @change.prevent="uploadImageFile($event.target.files)"
            />
          </div>
        </div>
        <!-- Name & Youtube Music Id -->
        <div class="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          <!-- Name -->
          <div class="w-full">
            <label
              for="name"
              class="mb-2 block font-semibold uppercase tracking-wide"
            >
              Name*
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Name"
              class="
                block
                w-full
                appearance-none
                rounded
                border border-tertiary
                bg-tertiary
                py-3
                px-4
                leading-tight
                text-quaternary
                focus:border-quinary focus:bg-tertiary focus:outline-none
              "
            />
          </div>
          <!-- Youtube Music Id -->
          <div class="w-full">
            <label
              for="ytb-music-id"
              class="mb-2 block font-semibold uppercase tracking-wide"
            >
              Youtube Music Id*
            </label>
            <input
              id="ytb-music-id"
              v-model="idYoutubeMusic"
              type="text"
              placeholder="Youtube Music ID"
              class="
                block
                w-full
                appearance-none
                rounded
                border border-tertiary
                bg-tertiary
                py-3
                px-4
                leading-tight
                text-quaternary
                focus:border-quinary focus:bg-tertiary focus:outline-none
              "
            />
          </div>
        </div>
        <!-- Type -->
        <div class="w-full">
          <label
            for="type"
            class="mb-2 block font-semibold uppercase tracking-wide"
          >
            Type
          </label>
          <!--Select Solo or Group -->
          <select
            id="type"
            v-model="type"
            class="
              block
              w-full
              rounded
              border border-tertiary
              bg-tertiary
              py-3
              px-4
              leading-tight
              text-quaternary
              focus:border-quinary focus:bg-tertiary focus:outline-none
            "
          >
            <option value="SOLO">Solo</option>
            <option value="GROUP">Group</option>
          </select>
        </div>
        <div
          class="grid w-full grid-cols-1 gap-5"
          :class="{ 'lg:grid-cols-2': type !== 'SOLO' }"
        >
          <!-- Members -->
          <div v-if="type !== 'SOLO'" class="w-full">
            <label
              for="members"
              class="mb-2 block font-semibold uppercase tracking-wide"
              >Members or Subunits</label
            >
            <multiselect
              id="members"
              v-model="members"
              label="name"
              track-by="name"
              :options="artistList"
              placeholder="Search an artist"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="false"
            />
          </div>
          <!-- Groups -->
          <div class="w-full">
            <label
              for="groups"
              class="mb-2 block font-semibold uppercase tracking-wide"
            >
              Groups
            </label>
            <multiselect
              v-model="groups"
              label="name"
              track-by="name"
              :options="artistList"
              placeholder="Search a group"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="false"
            />
          </div>
        </div>
        <!-- Styles -->
        <div class="w-full">
          <label
            for="styles"
            class="mb-2 block font-semibold uppercase tracking-wide"
          >
            Styles
          </label>
          <multiselect
            v-model="styles"
            label="name"
            track-by="name"
            :options="styleList"
            placeholder="Search or add a style"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="false"
          />
        </div>
        <!-- Description -->
        <div class="w-full">
          <label
            for="description"
            class="mb-2 block font-semibold uppercase tracking-wide"
          >
            Description
          </label>
          <textarea
            id="description"
            v-model="description"
            type="text"
            placeholder="Description"
            class="
              block
              w-full
              appearance-none
              rounded
              border border-tertiary
              bg-tertiary
              py-3
              px-4
              leading-tight
              text-quaternary
              focus:border-quinary focus:bg-tertiary focus:outline-none
            "
          />
        </div>
        <!-- Social Media & Streaming Platforms Links -->
        <div class="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          <!-- Social Media Link -->
          <div class="w-full">
            <label
              for="description"
              class="mb-2 block font-semibold uppercase tracking-wide"
            >
              Social Media Link
            </label>
            <MultipleInput
              v-for="(element, index) in socials"
              :key="index"
              class="mb-1 w-full"
              :element="element"
              placeholder="Add a social media link"
              icon
              @updateinput="updateList(socials, $event, index)"
              @deleteinput="deleteList(socials, index)"
            />
            <button
              class="
                flex
                w-full
                justify-center
                space-x-2
                rounded
                bg-tertiary bg-opacity-30
                p-2
                text-left
                focus:outline-none
              "
              @click="addSocialLink()"
            >
              <icons-plus class="h-5 w-5 text-quaternary" />
            </button>
          </div>
          <!-- Streaming Platforms Link -->
          <div class="w-full">
            <label
              for="description"
              class="mb-2 block font-semibold uppercase tracking-wide"
            >
              Streaming Platforms Link
            </label>
            <MultipleInput
              v-for="(element, index) in platforms"
              :key="index"
              class="mb-1 w-full"
              :element="element"
              placeholder="Add a platform link"
              icon
              @updateinput="updateList(platforms, $event, index)"
              @deleteinput="deleteList(platforms, index)"
            />
            <button
              class="
                flex
                w-full
                justify-center
                space-x-2
                rounded
                bg-tertiary bg-opacity-30
                p-2
                text-left
                focus:outline-none
              "
              @click="addPlatformLink()"
            >
              <icons-plus class="h-5 w-5 text-quaternary" />
            </button>
          </div>
        </div>
        <button
          class="
            w-full
            rounded
            bg-primary
            hover:bg-primary/50
            py-5
            font-semibold
          "
          @click="updateArtist()"
        >
          Update Artist
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UpdateArtist',

  async asyncData({ $fire, params }) {
    const artist = await $fire.firestore
      .collection('artists')
      .doc(params.id)
      .get()
      .then((doc) => {
        return doc.data()
      })

    const members = await $fire.firestore
      .collection('artists')
      .doc(params.id)
      .collection('members')
      .get()
      .then((snapshot) => {
        const members = []
        snapshot.forEach((doc) => {
          const member = doc.data()
          member.id = doc.id
          members.push(member)
        })
        return members
      })

    const groups = await $fire.firestore
      .collection('artists')
      .doc(params.id)
      .collection('groups')
      .get()
      .then((snapshot) => {
        const groups = []
        snapshot.forEach((doc) => {
          const group = doc.data()
          group.id = doc.id
          groups.push(group)
        })
        return groups
      })

    return {
      name: artist.name,
      image: artist.image,
      type: artist.type,
      description: artist.description,
      idYoutubeMusic: artist.idYoutubeMusic,
      socials: artist.socials,
      platforms: artist.platforms,
      styles: artist.styles,

      members,
      groups,
    }
  },

  data() {
    return {
      dataToUpdate: {},

      // general
      isUploadingImage: false,
      artistList: [],
      styleList: [],
      newStyleAdded: false,
      groupListModified: false,
      memberListModified: false,
    }
  },

  watch: {
    name: {
      handler(data) {
        this.dataToUpdate.name = data
      },
    },
    image: {
      handler(data) {
        this.dataToUpdate.image = data
      },
    },
    type: {
      handler(data) {
        this.dataToUpdate.type = data
      },
    },
    description: {
      handler(data) {
        this.dataToUpdate.description = data
      },
    },
    idYoutubeMusic: {
      handler(data) {
        this.dataToUpdate.idYoutubeMusic = data
      },
    },
    socials: {
      handler(data) {
        this.dataToUpdate.socials = data
      },
    },
    platforms: {
      handler(data) {
        this.dataToUpdate.platforms = data
      },
    },
    styles: {
      handler(data) {
        console.log('styles changed', data)
        this.dataToUpdate.styles = data
      },
      deep: true,
    },
    groups: {
      handler(data) {
        console.log('groups changed', data)
        this.groupListModified = true
      },
      deep: true,
    },
    members: {
      handler(data) {
        console.log('members changed', data)
        this.memberListModified = true
      },
      deep: true,
    },
  },

  mounted() {
    // this.fetchArtist()
    // this.fetchMembersFromArtist()
    // this.fetchGroupsFromArtist()
    this.fetchArtistList()
    this.fetchStyleList()

    // console.log('name', this.name)
    // console.log('image', this.image)
    // console.log('type', this.type)
    // console.log('description', this.description)
    // console.log('idYoutubeMusic', this.idYoutubeMusic)
    // console.log('socials', this.socials)
    // console.log('platforms', this.platforms)
    // console.log('styles', this.styles)
    // console.log('members', this.members)
    // console.log('groups', this.groups)
  },

  methods: {
    ...mapGetters(['GET_USER']),

    async fetchArtist() {
      await this.$fire.firestore
        .collection('artists')
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          this.name = doc.data().name
          this.image = doc.data().image
          this.type = doc.data().type
          this.description = doc.data().description
          this.idYoutubeMusic = doc.data().idYoutubeMusic
          this.socials = doc.data().socials
          this.platforms = doc.data().platforms
          this.styles = doc.data().styles
        })
    },

    async fetchMembersFromArtist() {
      await this.$fire.firestore
        .collection('artists')
        .doc(this.$route.params.id)
        .collection('members')
        .get()
        .then((snapshot) => {
          const members = []
          snapshot.forEach((doc) => {
            const member = doc.data()
            member.id = doc.id
            members.push(member)
          })
          this.members = members
        })
    },

    async fetchGroupsFromArtist() {
      await this.$fire.firestore
        .collection('artists')
        .doc(this.$route.params.id)
        .collection('groups')
        .get()
        .then((snapshot) => {
          const groups = []
          snapshot.forEach((doc) => {
            const group = doc.data()
            group.id = doc.id
            groups.push(group)
          })
          this.groups = groups
        })
    },

    async fetchArtistList() {
      await this.$fire.firestore
        .collection('artists')
        .where('verified', '==', true)
        .get()
        .then((snapshot) => {
          const artists = []
          snapshot.forEach((doc) => {
            artists.push(doc.data())
          })
          this.artistList = artists
        })
    },

    async fetchStyleList() {
      await this.$fire.firestore
        .collection('general')
        .doc('data')
        .get()
        .then((snapshot) => {
          this.styleList = snapshot.data().styles
        })
    },

    updateList(list, newElem, index) {
      list[index] = newElem
    },

    deleteList(list, index) {
      list.splice(index, 1)
    },

    addPlatformLink() {
      if (this.platforms === null) {
        this.platforms = ['']
      } else {
        this.platforms.push('')
      }
    },

    addSocialLink() {
      if (this.socials === null) {
        this.socials = ['']
      } else {
        this.socials.push('')
      }
    },

    launchImageFile() {
      this.$refs.imageFile.click()
    },

    uploadImageFile(files) {
      if (!files.length) {
        return
      }
      const file = files[0]

      if (!file.type.match('image.*')) {
        alert('Please upload an image.')
        return
      }

      const metadata = {
        contentType: file.type,
      }

      this.isUploadingImage = true

      const imageRef = this.$fire.storage.ref(`images/artist/${new Date()}`)

      const uploadTask = imageRef
        .put(file, metadata)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL().then((url) => {
            return url
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
      uploadTask.then((url) => {
        this.image = url
        this.isUploadingImage = false
      })
    },

    async updateArtist() {
      if (!this.name || !this.idYoutubeMusic) {
        this.$toasted.error(
          'Please fill all fields before with * before send an artist',
          {
            duration: 5000,
            position: 'top-center',
          }
        )
      } else {
        this.dataToUpdate.id = this.$route.params.id
        const artistData = this.dataToUpdate

        console.log('artistData', artistData)
        if (this.memberListModified) console.log('members', this.members)
        if (this.groupListModified) console.log('groups', this.groups)

        await this.$fire.firestore
          .collection('updateArtistPending')
          .doc(this.$route.params.id)
          .set(artistData)
          .then((docRef) => {
            // const generatedId = docRef.id
            // console.log('Generated Id: ', generatedId)
            this.$toasted.success('Artist updated', {
              duration: 5000,
              position: 'top-center',
            })
            if (this.memberListModified) {
              this.members.forEach(async (member) => {
                console.log('member', member)
                await this.$fire.firestore
                  .collection('updateArtistPending')
                  .doc(this.$route.params.id)
                  .collection('members')
                  .doc(member.id)
                  .set(member)
                  .then(() => {
                    console.log('member added')
                  })
              })
            }
            if (this.groupListModified) {
              this.groups.forEach(async (group) => {
                console.log('group', group)
                await this.$fire.firestore
                  .collection('updateArtistPending')
                  .doc(this.$route.params.id)
                  .collection('groups')
                  .doc(group.id)
                  .set(group)
                  .then(() => {
                    console.log('group added')
                  })
              })
            }
          })
          .catch((error) => {
            console.log('error', error)
            this.$toasted.error('Error updating artist', {
              duration: 5000,
              position: 'top-center',
            })
          })
      }
    },
  },
}
</script>
