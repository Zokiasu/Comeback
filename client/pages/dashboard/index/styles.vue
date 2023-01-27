<template>
  <div class="space-y-5 py-5 px-10">
    <div class="bg-quaternary p-5 rounded">
      <div class="w-full space-y-3">
        <label
          for="ytb-music-id"
          class="block font-semibold uppercase tracking-wide"
        >
          Add New Style
        </label>
        <input
          id="style-name"
          v-model="newStyle"
          type="text"
          placeholder="New Style Name"
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
        <button class="bg-secondary px-3 py-2 rounded" @click="newStyle = ''">
          <p>Reset</p>
        </button>
        <button class="bg-secondary px-3 py-2 rounded" @click="addStyle">
          <p>Validate</p>
        </button>
      </div>
    </div>
    <p class="text-2xl">Style's List</p>
    <div v-if="generalData" class="flex flex-wrap gap-3">
      <p
        v-for="(style, index) in generalData.styles"
        :key="`style_${index}`"
        class="bg-quaternary rounded px-3 py-2"
      >
        {{ style.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StyleList',

  data() {
    return {
      generalData: null,
      newStyle: '',
    }
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      const data = await this.$fire.firestore
        .collection('general')
        .doc('data')
        .get()
      this.generalData = data.data()
      this.generalData.styles.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
    },

    addStyle() {
      // add newStyle to generalData.styles list
      this.generalData.styles.push({
        created: this.$fireModule.firestore.Timestamp.fromDate(new Date()),
        name: this.newStyle,
      })
      // push generalData.styles list to firestore
      this.$fire.firestore
        .collection('general')
        .doc('data')
        .set(this.generalData)
        .then(() => {
          console.log('Style added')
          this.$toast.success('Style added', {
            duration: 5000,
            position: 'top',
          })
        })

      this.newStyle = ''
      this.fetchData()
    },
  },
}
</script>