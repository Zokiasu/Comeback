<template>
  <div class="bg-quaternary space-y-5 p-5">
    <p class="font-bold text-lg">Actual Data</p>
    <div v-if="actualArtistData" class="space-y-2">
      <div
        class="flex flex-col space-y-2 xl:space-y-0 xl:flex-row xl:space-x-2"
      >
        <img
          :src="actualArtistData.image"
          :alt="actualArtistData.name"
          class="rounded-md aspect-video h-60 object-cover drop-shadow-xl"
        />
        <div class="space-y-1">
          <p>Name : {{ actualArtistData.name }}</p>
          <p>idYoutubeMusic : {{ actualArtistData.idYoutubeMusic }}</p>
          <p>Type : {{ actualArtistData.type }}</p>
          <div v-if="actualArtistData.styles.length > 0" class="space-y-1">
            <p>Styles :</p>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="(style, indexStyle) in actualArtistData.styles"
                :key="indexStyle + '_style'"
                class="bg-quinary px-3 py-1 rounded"
              >
                {{ style.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="actualArtistData.platforms.length > 0" class="space-y-1">
        <p>Platforms :</p>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="(platform, indexPlatform) in actualArtistData.platforms"
            :key="indexPlatform + '_platform'"
            class="bg-quinary px-3 py-1 rounded"
          >
            {{ platform }}
          </li>
        </ul>
      </div>
      <div v-if="actualArtistData.socials.length > 0">
        <p>Socials :</p>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="(social, indexSocial) in actualArtistData.socials"
            :key="indexSocial + '_social'"
            class="bg-quinary px-3 py-1 rounded"
          >
            {{ social }}
          </li>
        </ul>
      </div>
      <div class="space-y-1">
        <p>Description</p>
        <p>{{ actualArtistData.description }}</p>
      </div>
    </div>

    <div class="w-full bg-tertiary py-0.5"></div>
    <!-- New Data -->
    <p class="font-bold text-lg">Data Updated</p>
    <div class="space-y-2">
      <div
        class="flex flex-col space-y-2 xl:space-y-0 xl:flex-row xl:space-x-2"
      >
        <img
          v-if="image && name"
          :src="image"
          :alt="name"
          class="rounded-md aspect-video h-60 object-cover drop-shadow-xl"
        />
        <div class="space-y-1">
          <p v-if="name">Name : {{ name }}</p>
          <p v-if="idYoutubeMusic">idYoutubeMusic : {{ idYoutubeMusic }}</p>
          <p v-if="type">Type : {{ type }}</p>
          <div v-if="styles.length > 0" class="space-y-1">
            <p>Styles :</p>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="(style, indexStyle) in styles"
                :key="indexStyle + '_style'"
                class="bg-quinary px-3 py-1 rounded"
              >
                {{ style.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="platforms.length > 0" class="space-y-1">
        <p>Platforms :</p>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="(platform, indexPlatform) in platforms"
            :key="indexPlatform + '_platform'"
            class="bg-quinary px-3 py-1 rounded"
          >
            {{ platform }}
          </li>
        </ul>
      </div>
      <div v-if="socials.length > 0" class="space-y-1">
        <p>Socials :</p>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="(social, indexSocial) in socials"
            :key="indexSocial + '_social'"
            class="bg-quinary px-3 py-1 rounded"
          >
            {{ social }}
          </li>
        </ul>
      </div>
      <div v-if="description" class="space-y-1">
        <p>Description</p>
        <p>{{ description }}</p>
      </div>
      <div v-if="members.length > 0" class="space-y-1">
        <p>Members</p>
        <div class="grid grid-cols-3 gap-5 xl:grid-cols-5">
          <nuxt-link
            v-for="soloMember in members"
            :key="soloMember.id"
            :to="`/artist/${soloMember.id}`"
          >
            <img
              :src="soloMember.image"
              :alt="soloMember.name"
              class="rounded-md aspect-video h-40 object-cover drop-shadow-xl"
            />
            <p>{{ soloMember.name }}</p>
          </nuxt-link>
        </div>
      </div>
      <div v-if="groups.length > 0" class="space-y-1">
        <p>Groups</p>
        <div class="grid grid-cols-3 gap-5 xl:grid-cols-5">
          <artist-card
            v-for="subGroup in groups"
            :id="subGroup.id"
            :key="subGroup.id"
            :image="subGroup.image"
            :name="subGroup.name"
          />
        </div>
      </div>
    </div>

    <!-- Button -->
    <div class="flex justify-end space-x-2">
      <button class="bg-red-700 rounded px-3 py-1" @click="reject()">
        Reject
      </button>
      <button class="bg-green-700 rounded px-3 py-1" @click="accept()">
        Validate
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistUpdated',

  props: {
    id: {
      type: String,
      required: true,
    },
    idYoutubeMusic: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    styles: {
      type: Array,
      default: () => [],
    },
    platforms: {
      type: Array,
      default: () => [],
    },
    socials: {
      type: Array,
      default: () => [],
    },
    members: {
      type: Array,
      default: () => [],
    },
    groups: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      actualArtistData: null,
    }
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      this.actualArtistData = await this.$fire.firestore
        .collection('artists')
        .doc(this.id)
        .get()
        .then((doc) => {
          return doc.data()
        })
    },
    accept() {
      console.log('accept')
      this.$emit('accept')
    },
    reject() {
      console.log('reject')
      this.$emit('reject')
    },
  },
}
</script>