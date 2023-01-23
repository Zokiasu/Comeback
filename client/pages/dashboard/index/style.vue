<template>
  <div class="space-y-5 p-5 px-10">
    <div class="flex flex-wrap">
      <div
        v-for="(style, index) in styleList"
        :key="style.id"
        class="mr-2 mb-2 flex space-x-1 rounded bg-gray-500 p-2 px-3 text-tertiary"
      >
        <span>{{ style.name }}</span>
        <img
          class="my-auto h-4 w-4 cursor-pointer"
          src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"
          @click="openEditSyle(style)"
        />
        <img
          class="my-auto h-4 w-4 cursor-pointer"
          src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"
          @click="deleteStyle(style.id, style, index)"
        />
        <Modal
          v-model="editStyle"
          title="Edit Style"
          wrapper-class="animate__animated modal-wrapper"
          :modal-style="{
            background: '#1F1D1D',
            'border-radius': '0.25rem',
            color: 'white',
          }"
          :in-class="`animate__fadeInDown`"
          :out-class="`animate__bounceOut`"
          bg-class="animate__animated"
          :bg-in-class="`animate__fadeInUp`"
          :bg-out-class="`animate__fadeOutDown`"
        >
          <div
            class="flex flex-col justify-center space-y-2 py-3 text-tertiary"
          >
            <t-input
              v-model="styles.name"
              type="text"
              placeholder="Style Name"
              name="Style Name"
            ></t-input>
            <button
              class="texts bg-bg-primary flex transform justify-center rounded-sm px-3 py-2 text-tertiary transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-900 hover:font-bold"
              @click="editStyleFucntion(styles.id, styles)"
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const styleList = await $axios.$get(
      'https://comeback-api.herokuapp.com/styles?sortby=name:asc'
    )

    return { styleList }
  },
  data() {
    return {
      styleList: [],
      editStyle: false,
      styles: {},
    }
  },

  methods: {
    deleteStyle(id, object, index) {
      this.$axios
        .delete(`https://comeback-api.herokuapp.com/styles/${id}`, object)
        .then((response) => {
          this.styleList.splice(index, 1)
        })
    },

    openEditSyle(object) {
      this.styles = object
      this.editStyle = true
    },

    async editStyleFucntion(styleId, object) {
      this.editStyle = false
      await this.$axios
        .put(`https://comeback-api.herokuapp.com/styles/${styleId}`, object)
        .then((response) => {
          this.styles = {}
          this.$toast.error('The style has been edited', {
            duration: 3000,
            position: 'top-right',
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>

<style>
.modal-custom {
  background: #1f1d1d;
  border-radius: 0.25rem;
  color: white;
}
</style>
