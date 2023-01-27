<template>
  <div class="container mx-auto flex flex-col p-5">
    <div class="space-y-5">
      <div>
        <div class="flex gap-5">
          <p class="text-3xl">{{ currentYear }}</p>
          <div class="my-auto grid grid-cols-2">
            <button class="px-1" @click="changeYear(currentYear + 1)">
              <icons-arrow-up class="h-5 w-5" />
            </button>
            <button class="px-1" @click="changeYear(currentYear - 1)">
              <icons-arrow-down class="h-5 w-5" />
            </button>
          </div>
        </div>
        <div class="flex gap-5">
          <h1 class="text-7xl font-semibold">{{ month[currentMonth] }}</h1>
          <div class="my-auto mt-4 grid grid-cols-1 space-y-2">
            <button class="p-1" @click="changeMonth(currentMonth + 1)">
              <icons-arrow-up class="h-5 w-5" />
            </button>
            <button class="p-1" @click="changeMonth(currentMonth - 1)">
              <icons-arrow-down class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <ul class="flex flex-wrap gap-5">
          <li>
            <button
              class="rounded border px-3 py-2"
              :class="
                onlyAlbums
                  ? 'border-2 border-red-500 font-semibold text-red-500'
                  : ''
              "
              @click="
                onlyAlbums = !onlyAlbums
                onlyEps = false
                onlySingles = false
              "
            >
              Album
            </button>
          </li>
          <li>
            <button
              class="rounded border px-3 py-2"
              :class="
                onlyEps
                  ? 'border-2 border-red-500 font-semibold text-red-500'
                  : ''
              "
              @click="
                onlyEps = !onlyEps
                onlyAlbums = false
                onlySingles = false
              "
            >
              EP
            </button>
          </li>
          <li>
            <button
              class="rounded border px-3 py-2"
              :class="
                onlySingles
                  ? 'border-2 border-red-500 font-semibold text-red-500'
                  : ''
              "
              @click="
                onlySingles = !onlySingles
                onlyAlbums = false
                onlyEps = false
              "
            >
              Single
            </button>
          </li>
        </ul>
      </div>
      <transition-group
        name="list-complete"
        tag="div"
        class="flex max-w-[110rem] flex-wrap gap-7"
      >
        <release-card
          v-for="release in filteredList"
          :id="release.id"
          :key="release.id"
          :image="release.image"
          :date="release.date"
          :name="release.name"
          :type="release.type"
          :artists="{ id: release.artistsId, name: release.artistsName }"
          display-date
          class="list-complete-item w-32 md:w-40"
        />
      </transition-group>
      <div v-if="(filteredList.length < 1) & !loading">
        <p class="w-full rounded bg-quinary p-5 text-center text-xl">
          Oops... {{ filteredList.length }} releases found
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ $fire, $fireModule }) {
    const releaseList = []
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const startDate = $fireModule.firestore.Timestamp.fromDate(
      new Date(currentYear, currentMonth, 1)
    )
    const endDate = $fireModule.firestore.Timestamp.fromDate(
      new Date(currentYear, currentMonth + 1, 1)
    )
    $fire.firestore
      .collection('releases')
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
      .orderBy('date', 'desc')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const release = doc.data()
          release.id = doc.id
          release.date = new Date(doc.data().date.seconds * 1000)
          releaseList.push(release)
        })
      })
    return { releaseList }
  },

  data() {
    return {
      startDate: null,
      endDate: null,
      releaseList: [],
      onlyAlbums: false,
      onlyEps: false,
      onlySingles: false,
      loading: true,
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    }
  },

  head() {
    return {
      title:
        "Comeback - Calendar - Find all the artist's releases by day and according to your preferences.",
    }
  },

  computed: {
    filteredList() {
      return this.releaseList.filter((element) => {
        if (this.onlyAlbums && element.type.toLowerCase() !== 'album')
          return false
        if (this.onlyEps && element.type.toLowerCase() !== 'ep') return false
        if (this.onlySingles && element.type.toLowerCase() !== 'single')
          return false
        return true
      })
    },
  },

  created() {
    this.startDate = new Date(this.currentYear, this.currentMonth, 1)
    this.endDate = new Date(this.currentYear, this.currentMonth + 1, 1)
  },

  methods: {
    async fetchData() {
      this.releaseList = []
      const tmpList = []
      this.releaseList = await this.$fire.firestore
        .collection('releases')
        .where(
          'date',
          '>=',
          this.$fireModule.firestore.Timestamp.fromDate(this.startDate)
        )
        .where(
          'date',
          '<=',
          this.$fireModule.firestore.Timestamp.fromDate(this.endDate)
        )
        .orderBy('date', 'desc')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const release = doc.data()
            release.id = doc.id
            release.date = new Date(doc.data().date.seconds * 1000)
            tmpList.push(release)
          })
          return tmpList
        })
    },

    dateFormat(d) {
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
      const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d)
      const da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d)
      return `${mo}/${da}/${ye}`
    },

    changeMonth(month) {
      if (month < 0) {
        this.currentMonth = 11
        this.currentYear--
      } else if (month > 11) {
        this.currentMonth = 0
        this.currentYear++
      } else {
        this.currentMonth = month
      }
      this.startDate = new Date(this.currentYear, this.currentMonth, 1)
      this.endDate = new Date(this.currentYear, this.currentMonth + 1, 1)
      this.fetchData()
    },

    changeYear(year) {
      this.startDate = new Date(year, this.currentMonth, 1)
      this.endDate = new Date(year, this.currentMonth + 1, 1)
      this.currentYear = year
      this.fetchData()
    },
  },
}
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
