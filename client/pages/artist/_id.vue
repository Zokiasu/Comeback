<template>
  <div>
    <section
      class="
        background-top
        relative
        overflow-hidden
        bg-cover bg-no-repeat
        h-[20vh]
        md:h-[30vh]
        lg:h-[40vh]
        xl:h-[50vh]
        2xl:h-[70vh]
      "
    >
      <img
        :src="imageBackground"
        :alt="artist.name"
        class="
          absolute
          top-0
          bottom-0
          left-0
          right-0
          h-full
          w-full
          object-cover
        "
      />
      <div
        class="
          absolute
          top-0
          bottom-0
          left-0
          right-0
          flex
          items-center
          bg-secondary/60
          p-5
          lg:p-10
          xl:p-14 xl:px-32
        "
      >
        <div class="flex items-center space-x-5">
          <div class="hidden xl:block relative overflow-hidden">
            <img
              :src="imageBackground"
              :alt="artist.name"
              class="
                hover:scale-105
                transition-all
                duration-150
                h-80
                aspect-video
                rounded-md
                drop-shadow-2xl
                object-cover
              "
            />
          </div>
          <div class="flex flex-col space-y-2 md:overflow-x-auto lg:space-y-5">
            <h1 class="text-4xl md:text-6xl font-semibold lg:text-7xl">
              {{ artist.name }}
            </h1>
            <div
              v-if="artist.platforms.length > 0"
              class="
                testa
                hidden
                md:flex
                flex-wrap
                gap-1
                overflow-x-scroll
                text-sm
                lg:gap-3
              "
            >
              <cb-external-link
                v-for="link in artist.platforms"
                :key="link"
                :href="link"
              />
            </div>
            <div
              v-if="artist.socials.length > 0"
              class="
                testa
                hidden
                md:flex
                flex-wrap
                gap-1
                overflow-x-scroll
                text-sm
                lg:gap-3
              "
            >
              <cb-external-link
                v-for="link in artist.socials"
                :key="link"
                :href="link"
              />
            </div>
            <div v-if="displayOnlineOption" class="flex space-x-2">
              <button
                class="flex items-center space-x-1 px-3 py-2"
                @click="followTest()"
              >
                <icons-heart-filled
                  v-if="liked"
                  class="
                    h-5
                    w-5
                    transition
                    duration-300
                    ease-in-out
                    hover:bg-secondary
                  "
                />
                <icons-heart-outline
                  v-else
                  class="
                    h-5
                    w-5
                    transition
                    duration-300
                    ease-in-out
                    hover:bg-secondary
                  "
                />
                <p v-if="!liked">Add favoris</p>
                <p v-else>Remove favoris</p>
              </button>
              <nuxt-link
                v-if="admin"
                :to="`/edit/artist/${$route.params.id}`"
                class="flex items-center space-x-1 px-3 py-2"
              >
                <icons-edit class="h-4 w-4 -rotate-90" />
                <p>Editer</p>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-10 p-5 lg:p-10 xl:p-14 xl:px-32">
      <div
        class="md:hidden mt-auto flex flex-col gap-2 overflow-x-auto lg:gap-8"
      >
        <div
          v-if="artist.platforms.length > 0"
          class="testa flex flex-wrap gap-1 overflow-x-scroll text-sm lg:gap-3"
        >
          <cb-external-link
            v-for="link in artist.platforms"
            :key="link"
            :href="link"
          />
        </div>
        <div
          v-if="artist.socials.length > 0"
          class="testa flex flex-wrap gap-1 overflow-x-scroll text-sm lg:gap-3"
        >
          <cb-external-link
            v-for="link in artist.socials"
            :key="link"
            :href="link"
          />
        </div>
      </div>
      <p v-if="artist.description" class="whitespace-pre-line">
        {{ artist.description }}
      </p>
      <div v-if="soloMembers.length > 0" class="space-y-5">
        <h2 class="text-xl font-semibold">Members</h2>
        <transition-group
          name="list-complete"
          tag="div"
          class="flex flex-wrap gap-10"
        >
          <artist-card
            v-for="soloMember in soloMembers"
            :id="soloMember.id"
            :key="soloMember.id"
            :image="soloMember.image"
            :name="soloMember.name"
            class="w-32 md:w-40"
          />
        </transition-group>
      </div>
      <div v-if="releases.length > 0" class="space-y-5">
        <h2 class="text-xl font-semibold">Release</h2>
        <transition-group
          name="list-complete"
          tag="div"
          class="flex flex-wrap gap-10"
        >
          <release-card
            v-for="release in releases"
            :id="release.id"
            :key="release.id"
            :image="release.image"
            :date="release.date"
            :name="release.name"
            :type="release.type"
            :artists="{ id: release.artistsId, name: release.artistsName }"
            :display-date="true"
            class="w-32 md:w-40"
          />
        </transition-group>
      </div>
      <div v-if="groupMembers.length > 0" class="space-y-5">
        <h2 class="text-xl font-semibold">Subunit</h2>
        <transition-group
          name="list-complete"
          tag="div"
          class="flex flex-wrap gap-10"
        >
          <artist-card
            v-for="groupMember in groupMembers"
            :id="groupMember.id"
            :key="groupMember.id"
            :image="groupMember.image"
            :name="groupMember.name"
            class="w-32 md:w-40"
          />
        </transition-group>
      </div>
      <div v-if="groups.length > 0" class="space-y-5">
        <h2 class="text-xl font-semibold">Group's Unit</h2>
        <transition-group
          name="list-complete"
          tag="div"
          class="flex flex-wrap gap-8"
        >
          <artist-card
            v-for="group in groups"
            :id="group.id"
            :key="group.id"
            :image="group.image"
            :name="group.name"
            class="w-32 md:w-40"
          />
        </transition-group>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IconsEdit from '~/components/Icons/IconsEdit.vue'

export default {
  components: { IconsEdit },

  async asyncData({ params, $fire, store }) {
    const getArtist = await $fire.firestore
      .collection('artists')
      .doc(params.id)
      .get()
      .then((doc) => {
        return doc.data()
      })

    const getReleaseByArtist = await $fire.firestore
      .collection('releases')
      .where('artistsId', '==', params.id)
      .get()
      .then((snapshot) => {
        const releaseL = []
        // ajouter dans releaseL et trier par date
        snapshot.forEach((doc) => {
          const release = doc.data()
          release.date = new Date(doc.data().date.seconds * 1000)
          releaseL.push(release)
        })
        // trier par date
        releaseL.sort((a, b) => {
          return b.date - a.date
        })
        return releaseL
      })

    const getMembers = await $fire.firestore
      .collection('artists')
      .doc(params.id)
      .collection('members')
      .orderBy('name', 'asc')
      .get()
      .then((snapshot) => {
        const members = []
        snapshot.forEach((doc) => {
          members.push(doc.data())
        })
        return members
      })

    const getGroups = await $fire.firestore
      .collection('artists')
      .doc(params.id)
      .collection('groups')
      .orderBy('name', 'asc')
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

    let liked = false
    if (store.state.isLoggedIn) {
      liked = await $fire.firestore
        .collection('artists')
        .doc(params.id)
        .collection('followers')
        .where('id', '==', store.state.user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.size > 0) {
            return true
          }
          return false
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }

    return {
      artist: getArtist,
      releases: getReleaseByArtist,
      members: getMembers,
      groups: getGroups,
      liked,
    }
  },

  data() {
    return {
      liked: false,
      displayOnlineOption: false,
      admin: false,
      seeDescription: false,
      artist: null,
      members: [],
      groups: [],
      releases: [],
      userInfo: null,
      imageBackground: 'https://picsum.photos/200',
    }
  },

  head() {
    return {
      title: this.artist?.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.artist?.description,
        },
      ],
    }
  },

  computed: {
    soloMembers() {
      return this.members.filter((member) => member.type === 'SOLO')
    },
    groupMembers() {
      return this.members.filter((member) => member.type === 'GROUP')
    },
  },

  watch: {
    '$store.getters.isLoggedIn': function (newVal, oldVal) {
      this.displayOnlineOption = newVal
    },

    '$store.getters.isAdmin': function (newVal, oldVal) {
      this.admin = newVal
    },
  },

  created() {
    if (this.isLoggedIn()) {
      this.displayOnlineOption = this.isLoggedIn()
      this.admin = this.isAdmin()
      this.userInfo = this.GET_USER_DATA()
    }
    this.imageBackground = this.artist.image.toString()
  },

  methods: {
    ...mapGetters(['GET_USER', 'GET_USER_DATA', 'isLoggedIn', 'isAdmin']),

    followTest() {
      if (this.liked) {
        this.unfollowArtist()
      } else {
        this.followArtist()
      }
    },

    followArtist() {
      const addFollowerArtist =
        this.$fire.functions.httpsCallable('addFollowerArtist')
      addFollowerArtist({
        id: this.artist.id,
        user: {
          id: this.GET_USER().uid,
          image: this.GET_USER_DATA().image,
          name: this.GET_USER_DATA().name,
        },
      }).then((res) => {
        this.liked = true
      })
    },

    unfollowArtist() {
      const deleteFollowerArtist = this.$fire.functions.httpsCallable(
        'deleteFollowerArtist'
      )
      deleteFollowerArtist({
        id: this.artist.id,
        user: {
          id: this.GET_USER().uid,
          image: this.GET_USER_DATA().image,
          name: this.GET_USER_DATA().name,
        },
      }).then((res) => {
        this.liked = false
      })
    },
  },
}
</script>

<style scoped>
/* ne pas afficher la scrollbar dans la div */
.testa {
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.testa::-webkit-scrollbar {
  display: none;
}
.list-complete-item {
  transition: all 0.5s;
  display: inline-block;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
