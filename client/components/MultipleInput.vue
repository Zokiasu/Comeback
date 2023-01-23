<template>
  <div class="flex gap-2 rounded bg-gray-200">
    <input
      id="name"
      v-model="input"
      type="text"
      :placeholder="placeholder"
      class="block w-full appearance-none rounded bg-gray-200 px-2 py-3 leading-tight text-gray-700 focus:outline-none"
      @change="updateInput"
    />
    <button class="focus:outline-none" @click="deleteInput()">
      <icons-close class="h-6 w-6 text-gray-500" />
    </button>
  </div>
</template>

<script>
import LinkImg from './LinkImg.vue'
export default {
  components: { LinkImg },
  props: {
    element: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      input: '',
    }
  },

  created() {
    this.input = JSON.parse(JSON.stringify(this.element))
  },

  methods: {
    updateInput() {
      this.$emit('updateinput', this.input)
    },

    deleteInput() {
      this.$emit('deleteinput')
    },
  },
}
</script>
