<template>
  <div class="flex flex-col p-5 sm:mx-auto lg:p-10">
    <div class="mx-auto w-full rounded-lg bg-black-one p-5 lg:max-w-full">
      <h2 class="mb-3 text-3xl font-semibold">Create New Artist</h2>
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
              Youtube Music Id
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
        <div class="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          <!-- Members -->
          <div class="w-full">
            <label
              for="members"
              class="mb-2 block font-semibold uppercase tracking-wide"
              >Members</label
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
              <icons-plus class="h-5 w-5 text-main-gray" />
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
              <icons-plus class="h-5 w-5 text-main-gray" />
            </button>
          </div>
        </div>
        <!-- Source -->
        <div class="w-full">
          <label
            for="source"
            class="mb-2 block font-semibold uppercase tracking-wide"
          >
            Source*
          </label>
          <textarea
            id="source"
            v-model="source"
            type="text"
            placeholder="Source"
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
        <div class="flex w-full justify-end">
          <button
            class="rounded bg-primary px-4 py-2 font-semibold"
            @click="createArtist()"
          >
            Send Artist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CreateArtist',

  async asyncData({ $fire }) {
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
      .catch(() => {
        return { success: false, artists: [] }
      })
    artistList.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })

    const styleList = await $fire.firestore
      .collection('general')
      .doc('data')
      .get()
      .then((snapshot) => {
        return snapshot.data().styles
      })
      .catch(() => {
        return { success: false, artists: [] }
      })

    return {
      artistList,
      styleList,
    }
  },

  data() {
    return {
      name: '',
      image:
        'https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Freleases.png?alt=media&token=e4b0ae0c-3a5d-4ecd-a745-c4439811dcce',
      type: 'SOLO',
      description: '',
      idYoutubeMusic: null,
      source: '',
      socials: [],
      platforms: [],
      members: [],
      groups: [],
      styles: [],
      // general
      isUploadingImage: false,
      styleList: [],
      newStyleAdded: false,
    }
  },

  methods: {
    ...mapGetters(['GET_USER']),

    createArtist() {
      if (this.name === '' || this.source === '') {
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

      const createArtist = this.$fire.functions.httpsCallable('createArtist')
      createArtist({
        name: this.name,
        image: this.image,
        type: this.type,
        verified: false,
        description: this.description,
        socials: this.socials,
        platforms: this.platforms,
        idSpotify: null,
        idYoutubeMusic: this.idYoutubeMusic,
        groups: this.groups,
        members: this.members,
        styles: this.styles,
        releases: null,
        addedBy: this.GET_USER().uid,
      })
        .then((result) => {
          const updateArtist =
            this.$fire.functions.httpsCallable('updateArtistById')
          updateArtist({ id: result.data.id })
            .then(() => {
              this.$toast.success(
                'Thank you, Your artist have been sent for verification',
                { duration: 5000, position: 'top-right' }
              )
              this.$router.push('/')
            })
            .catch(() => {
              this.$toast.error('Error updating artist', {
                duration: 5000,
                position: 'top-right',
              })
            })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    addStyle(newTag) {
      if (this.styles === null) {
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
  },
}
</script>
