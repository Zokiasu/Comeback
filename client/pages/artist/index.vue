<template>
  <div class="mx-auto p-5 md:p-10">
    <div id="searchbar" class="flex w-full justify-start">
      <div id="search-icon" class="bg-opacity-20 bg-gray-500 rounded-l p-2">
        <icons-search v-if="!searchActive" class="w-5 h-5 cursor-pointer" />
        <icons-cancel v-else class="w-5 h-5 cursor-pointer" />
      </div>
      <input
        id="search-input"
        type="text"
        placeholder="Search"
        v-model="search"
        class="
          w-full
          pl-2
          focus:outline-none
          rounded-r rounded-none
          bg-opacity-20 bg-gray-500
          text-tertiary
          placeholder-tertiary
        "
      />
    </div>
    <transition-group
      id="artist-list"
      name="list-complete"
      tag="div"
      class="
        grid grid-cols-2
        gap-5
        md:gap-10
        py-5
        md:py-10
        items-center
        justify-center
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-7
        2xl:grid-cols-8
      "
    >
      <lazy-artist-card
        v-for="artist in filteredArtistList"
        :key="artist.id"
        :image="artist.image"
        :name="artist.name"
        :id="artist.id"
        :type="artist.type"
        :groups="artist.groups"
        class="list-complete-item w-34 mx-auto"
      />
    </transition-group>
    <div v-if="(filteredArtistList.length < 1) & !loading" class="px-5">
      <p
        class="
          text-tertiary
          bg-[#6B728033]
          w-full
          flex
          justify-center
          rounded
          p-2
        "
      >
        No artists found.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Artists",

  head() {
    return {
      title: "Comeback - Artists",
    };
  },

  data() {
    return {
      search: "",
      artists: [],
      loading: true,
      searchActive: false,
      limitedAt: 50,
      dsl: 0,
    };
  },

  mounted() {
    var vm = this;
    window.addEventListener("scroll", function (e) {
      var scrollPos = window.scrollY;
      var winHeight = window.innerHeight;
      var docHeight = document.documentElement.scrollHeight;
      var perc = (100 * scrollPos) / (docHeight - winHeight);
      if (perc > 15) {
        //vm.limitedAt += 50
        vm.fetchData();
      }
    });
  },

  watch: {
    search: {
      immediate: true,
      handler(search) {
        if (search != "") {
          this.searchActive = true;
        } else {
          this.searchActive = false;
        }
      },
    },
  },

  computed: {
    filteredArtistList() {
      return this.artists.filter((element) => {
        return element.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  async fetch() {
    this.artists = await this.$fire.firestore
      .collection("artists")
      .orderBy("name")
      /*.limit(this.limitedAt)*/
      .get()
      .then((snapshot) => {
        const artists = [];
        snapshot.forEach((doc) => {
          artists.push(doc.data());
        });
        this.loading = false;
        this.limitedAt = this.limitedAt + 20;
        return artists;
      });
  },

  methods: {
    async fetchData() {
      this.artists = await this.$fire.firestore
        .collection("artists")
        .orderBy("name")
        /*.limit(this.limitedAt)*/
        .get()
        .then((snapshot) => {
          const artists = [];
          snapshot.forEach((doc) => {
            artists.push(doc.data());
          });
          this.loading = false;
          this.limitedAt = this.limitedAt + 20;
          return artists;
        });
    },
  },
};
</script>

<style scoped>
.list-complete-item {
  transition: all 0.7s;
  display: inline-block;
}
.list-complete-enter {
  opacity: 0;
  transform: translateY(50px);
}
.list-complete-leave-active {
  opacity: 0;
  transform: translateX(-30px);
}
</style>