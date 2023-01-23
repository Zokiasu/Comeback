<template>
  <div class="flex flex-col p-5 sm:mx-auto lg:p-10">
    <div class="mx-auto w-full rounded-lg bg-black-one p-5 lg:max-w-full">
      <h2 class="mb-3 text-3xl font-semibold text-tertiary">Edit Artist</h2>
      <div class="flex flex-wrap gap-5">
        <!-- Picture -->
        <div class="w-full">
          <label
            for="name"
            class="mb-2 block font-semibold uppercase tracking-wide text-tertiary"
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
              class="h-full w-full rounded bg-red-one py-2 px-4 text-tertiary md:w-auto"
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
              class="mb-2 block font-semibold uppercase tracking-wide text-tertiary"
            >
              Name*
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Name"
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-tertiary focus:outline-none"
            />
          </div>
          <!-- Youtube Music Id -->
          <div class="w-full">
            <label
              for="ytb-music-id"
              class="mb-2 block font-semibold uppercase tracking-wide text-tertiary"
            >
              Youtube Music Id*
            </label>
            <input
              id="ytb-music-id"
              v-model="idYoutubeMusic"
              type="text"
              placeholder="Youtube Music ID"
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-tertiary focus:outline-none"
            />
          </div>
        </div>
        <!-- Type -->
        <div class="w-full">
          <label
            for="type"
            class="mb-2 block font-semibold uppercase tracking-wide text-tertiary"
          >
            Type
          </label>
          <!--Select Solo or Group -->
          <select
            id="type"
            v-model="type"
            class="block w-full rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-tertiary focus:outline-none"
          >
            <option value="SOLO">Solo</option>
            <option value="GROUP">Group</option>
          </select>
        </div>
        <div class="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          <!-- Members -->
          <div class="w-full">
            <label
              for="members"
              class="mb-2 block font-semibold uppercase tracking-wide text-tertiary"
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
              class="mb-2 block font-semibold uppercase tracking-wide text-tertiary"
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
            class="mb-2 block font-semibold uppercase tracking-wide text-tertiary"
          >
            Styles
          </label>
          <multiselect
            v-model="styles"
            :options="styleList"
            tag-placeholder="Add this as new style"
            placeholder="Search or add a style"
            :multiple="true"
            :taggable="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="false"
            @tag="addStyle"
          />
        </div>
        <!-- Description -->
        <div class="w-full">
          <label
            for="description"
            class="mb-2 block font-semibold uppercase tracking-wide text-tertiary"
          >
            Description
          </label>
          <textarea
            id="description"
            v-model="description"
            type="text"
            placeholder="Description"
            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-tertiary focus:outline-none"
          />
        </div>
        <!-- Social Media & Streaming Platforms Links -->
        <div class="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          <!-- Social Media Link -->
          <div class="w-full">
            <label
              for="description"
              class="mb-2 block font-semibold uppercase tracking-wide text-tertiary"
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
              class="flex w-full justify-center space-x-2 rounded bg-tertiary bg-opacity-30 p-2 text-left focus:outline-none"
              @click="addSocialLink()"
            >
              <icons-plus class="h-5 w-5 text-main-gray" />
            </button>
          </div>
          <!-- Streaming Platforms Link -->
          <div class="w-full">
            <label
              for="description"
              class="mb-2 block font-semibold uppercase tracking-wide text-tertiary"
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
              class="flex w-full justify-center space-x-2 rounded bg-tertiary bg-opacity-30 p-2 text-left focus:outline-none"
              @click="addPlatformLink()"
            >
              <icons-plus class="h-5 w-5 text-main-gray" />
            </button>
          </div>
        </div>
        <!-- Source -->
        <div class="w-full">
          <label
            for="source"
            class="mb-2 block font-semibold uppercase tracking-wide text-tertiary"
          >
            Source*
          </label>
          <textarea
            id="source"
            v-model="source"
            type="text"
            placeholder="Source"
            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-tertiary focus:outline-none"
          />
        </div>
        <div class="flex w-full justify-end">
          <button
            class="rounded bg-red-one px-4 py-2 font-semibold text-tertiary"
            @click="updateArtist()"
          >
            Update Artist
          </button>
        </div>
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

    const getMembers = await $fire.firestore
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

    const getGroups = await $fire.firestore
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

    const styleList = await $fire.firestore
      .collection('general')
      .doc('data')
      .get()
      .then((doc) => {
        return doc.data().styles
      })

    const artistList = await $fire.firestore
      .collection('artists')
      .where('verified', '==', true)
      .get()
      .then((snapshot) => {
        const artists = []
        snapshot.forEach((doc) => {
          artists.push(doc.data())
        })
        return artists
      })

    return {
      artistList,
      styleList,

      name: artist.name,
      image: artist.image,
      type: artist.type,
      description: artist.description,
      idYoutubeMusic: artist.idYoutubeMusic,
      source: artist.source,
      socials: artist.socials,
      platforms: artist.platforms,
      styles: artist.styles,

      members: getMembers,
      groups: getGroups,
    }
  },

  data() {
    return {
      name: '',
      image:
        'https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Freleases.png?alt=media&token=e4b0ae0c-3a5d-4ecd-a745-c4439811dcce',
      type: 'SOLO',
      description: '',
      idYoutubeMusic: '',
      source: '',
      socials: [],
      platforms: [],
      members: [],
      groups: [],
      styles: [],

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

  // watch all changes
  watch: {
    name: {
      handler: function (val) {
        this.dataToUp('name', val)
      },
      deep: true,
    },
    image: {
      handler: function (val) {
        this.dataToUp('image', val)
      },
      deep: true,
    },
    type: {
      handler: function (val) {
        this.dataToUp('type', val)
      },
      deep: true,
    },
    description: {
      handler: function (val) {
        this.dataToUp('description', val)
      },
      deep: true,
    },
    idYoutubeMusic: {
      handler: function (val) {
        this.dataToUp('idYoutubeMusic', val)
      },
      deep: true,
    },
    source: {
      handler: function (val) {
        this.dataToUp('source', val)
      },
      deep: true,
    },
    socials: {
      handler: function (val) {
        this.dataToUp('socials', val)
      },
      deep: true,
    },
    platforms: {
      handler: function (val) {
        this.dataToUp('platforms', val)
      },
      deep: true,
    },
    members: {
      handler: function (val) {
        this.memberListModified = true
      },
      deep: true,
    },
    groups: {
      handler: function (val) {
        this.groupListModified = true
      },
      deep: true,
    },
    styles: {
      handler: function (val) {
        this.dataToUp('styles', val)
      },
      deep: true,
    },
  },

  methods: {
    ...mapGetters(['GET_USER']),

    updateArtist() {
      if (this.name == '' || this.idYoutubeMusic == '' || this.source == '') {
        this.$toast.error(
          'Please fill all fields before with * before send an artist',
          { duration: 5000, position: 'top-right' }
        )
        return
      }

      if (this.newStyleAdded) {
        const updateStyle =
          this.$fire.functions.httpsCallable('updateListStyle')
        updateStyle({ styles: this.styleList })
          .then(() => {
            this.$toast.success('Styles updated', {
              duration: 5000,
              position: 'top-right',
            })
          })
          .catch(() => {
            this.$toast.error('Error updating styles', {
              duration: 5000,
              position: 'top-right',
            })
          })
      }

      this.dataToUpdate.idPending =
        this.$route.params.id + '-' + this.GET_USER().uid
      this.dataToUpdate.id = this.$route.params.id

      const updateArtist = this.$fire.functions.httpsCallable(
        'createPendingUpdateArtist'
      )
      updateArtist(this.dataToUpdate)
        .then(async (result) => {
          const addGroupToPending = this.$fire.functions.httpsCallable(
            'addPendingGroupsArtist'
          )
          await this.groups.map(async (group) => {
            await addGroupToPending({
              idPending: this.$route.params.id + '-' + this.GET_USER().uid,
              group: {
                id: group.id,
                image: group.image,
                name: group.name,
                type: group.type,
              },
            })
          })
          const addMemberToPending = this.$fire.functions.httpsCallable(
            'addPendingMembersArtist'
          )
          await this.members.map(async (member) => {
            await addMemberToPending({
              idPending: this.$route.params.id + '-' + this.GET_USER().uid,
              member: {
                id: member.id,
                image: member.image,
                name: member.name,
                type: member.type,
              },
            })
          })
          this.$toast.success(
            'Thank you, Your update have been sent for verification',
            { duration: 5000, position: 'top-right' }
          )
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    },

    addStyle(newTag) {
      if (this.styles == null) {
        this.styles = [newTag]
      } else {
        this.styles.push(newTag)
      }
      this.styleList.push(newTag)
      this.newStyleAdded = true
    },

    updateList(list, newElem, index) {
      list[index] = newElem
    },

    deleteList(list, index) {
      list.splice(index, 1)
    },

    addPlatformLink() {
      if (this.platforms == null) {
        this.platforms = ['']
      } else {
        this.platforms.push('')
      }
    },

    addSocialLink() {
      if (this.socials == null) {
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
          console.error(error)
        })
      uploadTask.then((url) => {
        this.image = url
        this.isUploadingImage = false
      })
    },

    dataToUp(key, value) {
      this.dataToUpdate[key] = value
    },
  },
}
</script>
