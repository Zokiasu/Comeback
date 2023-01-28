<template>
  <div class="flex flex-col justify-center space-y-2 py-3">
    <multiselect
      v-model="artistSelected"
      label="name"
      track-by="name"
      :options="artistList"
      placeholder="Please select an artist"
      :close-on-select="true"
      :clear-on-select="true"
      :preserve-search="false"
    />
    <t-datepicker
      v-model="newsDate"
      placeholder="Date"
      initial-view="month"
      date-format="Y-m-d"
      clearable
    />
    <t-textarea
      v-model="newsMessage"
      type="text"
      name="News"
      placeholder="Your News*"
    />
    <t-textarea
      v-model="newsSource"
      type="text"
      name="Source"
      placeholder="Source*"
    />
    <button
      class="
        bg-primary
        flex
        transform
        justify-center
        rounded-sm
        px-3
        py-2
        transition
        duration-500
        ease-in-out
        hover:-translate-y-1 hover:scale-110 hover:bg-red-900 hover:font-bold
      "
      @click="sendNews()"
    >
      {{ loading ? 'Loading...' : 'Send the news' }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NewsCreation',

  props: {
    artistList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      artistSelected: null,
      newArtist: false,
      newsArtistName: null,
      newsDate: null,
      newsMessage: null,
      newsSource: null,
      loading: false,
      user: null,
      createNews: null,
    }
  },

  watch: {
    newsDate: {
      immediate: true,
      handler(newsDate) {
        if (process.client) {
          if (newsDate)
            this.newsMessage = `Next comeback on ${this.dateFormat(
              new Date(newsDate)
            )}`
        }
      },
    },
  },

  mounted() {
    this.user = this.GET_USER_DATA()
    this.createNews = this.$fire.functions.httpsCallable('createNews')
  },

  methods: {
    ...mapGetters(['GET_USER_DATA']),

    sendNews() {
      this.user = this.GET_USER_DATA()
      if (!this.newsMessage) {
        this.$toasted.error('Please write a news or close the window', {
          duration: 3000,
          position: 'top-center',
        })
      } else if (!this.artistSelected) {
        this.$toasted.error('Please select a artist or suggest one', {
          duration: 3000,
          position: 'top-center',
        })
      } else {
        this.createNews({
          message: this.newsMessage,
          date: this.newsDate,
          verified: false,
          source: this.newsSource,
          user: {
            id: this.user.id,
            name: this.user.name,
            picture: this.user.picture,
          },
          artist: {
            id: this.artistSelected.id,
            name: this.artistSelected.name,
            image: this.artistSelected.image,
          },
        }).then((res) => {
          this.$toasted.success('News sent', {
            duration: 3000,
            position: 'top-center',
          })
          this.$emit('close')
        })
      }
    },

    dateFormat(d) {
      const ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d)
      const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
      return `${da}/${mo}/${ye}`
    },

    closeModal() {
      this.$emit('close')
    },
  },
}
</script>
