<template>
  <div class="space-y-3 rounded bg-quaternary p-5">
    <div v-if="originalArtist" class="space-y-3 rounded bg-quinary/30 p-5">
      <div class="flex gap-5">
        <img
          v-if="originalArtist.image"
          :src="originalArtist.image"
          class="h-80 w-80 rounded object-cover"
        />
        <div class="space-y-2">
          <p v-if="originalArtist.name" class="text-xl font-semibold">
            {{ originalArtist.name }}
          </p>
          <div v-if="originalArtist.type">
            <p class="rounded bg-quinary px-2 py-1 text-xs">
              {{ originalArtist.type }}
            </p>
          </div>
          <div v-if="originalArtist.platforms.length">
            <h3>Platforms</h3>
            <ul class="grid grid-cols-1 gap-3 md:grid-cols-2">
              <li
                v-for="(platform, index) in originalArtist.platforms"
                :key="`originalArtist_platform_${index}`"
                class="rounded bg-quinary px-3 py-1"
              >
                <p>{{ platform }}</p>
              </li>
            </ul>
          </div>
          <div v-if="originalArtist.socials.length">
            <h3>Socials</h3>
            <ul class="grid grid-cols-1 gap-3 md:grid-cols-2">
              <li
                v-for="(social, index) in originalArtist.socials"
                :key="`originalArtist_social_${index}`"
                class="rounded bg-quinary px-3 py-1"
              >
                <p>{{ social }}</p>
              </li>
            </ul>
          </div>
          <div v-if="originalArtist.styles.length">
            <h3>Styles</h3>
            <ul class="flex gap-2">
              <li
                v-for="(style, index) in originalArtist.styles"
                :key="`originalArtist_style_${index}`"
                class="rounded bg-quinary px-3 py-1"
              >
                <p>{{ style }}</p>
              </li>
            </ul>
          </div>
          <p v-if="originalArtist.description">
            {{ originalArtist.description }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="idPending">
      <h3 class="text-lg font-semibold">{{ idPending }}</h3>
    </div>
    <div v-if="name">
      <h3 class="text-lg font-semibold">{{ name }}</h3>
    </div>
    <div v-if="type">
      <p class="rounded bg-quinary px-2 py-1 text-xs">{{ type }}</p>
    </div>
    <div v-if="styles">
      <h3>Styles</h3>
      <ul class="flex gap-2">
        <li
          v-for="(style, index) in styles"
          :key="`style_${index}`"
          class="rounded bg-quinary px-3 py-1"
        >
          <p>{{ style.name }}</p>
        </li>
      </ul>
    </div>
    <div v-if="image || description" class="flex gap-5">
      <img v-if="image" :src="image" :alt="image" class="rounded shadow-xl" />
      <p v-if="description">{{ description }}</p>
    </div>
    <div v-if="platforms.length">
      <h3>Platforms</h3>
      <ul class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <li
          v-for="(platform, index) in platforms"
          :key="`platform_${index}`"
          class="rounded bg-quinary px-3 py-1"
        >
          <p>{{ platform }}</p>
        </li>
      </ul>
    </div>
    <div v-if="socials.length">
      <h3>Socials</h3>
      <ul class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <li
          v-for="(social, index) in socials"
          :key="`social_${index}`"
          class="rounded bg-quinary px-3 py-1"
        >
          <p>{{ social }}</p>
        </li>
      </ul>
    </div>
    <div v-if="groups.length">
      <h3>Groups</h3>
      <ul class="flex gap-2">
        <li
          v-for="(group, index) in groups"
          :key="`group_${index}`"
          class="rounded bg-quinary px-3 py-1"
        >
          <p>{{ group.name }}</p>
        </li>
      </ul>
    </div>
    <div v-if="members.length">
      <h3>Members or subunit</h3>
      <ul class="flex gap-2">
        <li
          v-for="(member, index) in members"
          :key="`member_${index}`"
          class="rounded bg-quinary px-3 py-1"
        >
          <p>{{ member.name }}</p>
        </li>
      </ul>
    </div>
    <div class="flex w-full justify-end gap-2">
      <button
        class="
          hover:bg-primary
          rounded
          bg-red-500
          px-5
          py-2
          font-semibold
          transition-all
          duration-300
          ease-in-out
        "
        @click="reject()"
      >
        Reject
      </button>
      <button
        class="
          rounded
          bg-green-500
          px-5
          py-2
          font-semibold
          transition-all
          duration-300
          ease-in-out
          hover:bg-green-700
        "
        @click="accept()"
      >
        Accept
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CbUpArtist',

  props: {
    id: {
      type: String,
      required: true,
    },
    idPending: {
      type: String,
      required: true,
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
      originalArtist: null,
    }
  },

  async fetch() {
    this.originalArtist = await this.$fire.firestore
      .collection('artists')
      .doc(this.id)
      .get()
      .then((doc) => {
        return doc.data()
      })
  },

  methods: {
    accept() {
      this.$emit('accept')
    },
    reject() {
      this.$emit('reject')
    },
  },
}
</script>
