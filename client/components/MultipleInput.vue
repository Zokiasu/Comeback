<template>
  <div class="flex gap-2 rounded bg-tertiary">
    <input
      id="name"
      v-model="input"
      type="text"
      :placeholder="placeholder"
      class="block w-full appearance-none rounded bg-tertiary px-2 py-3 leading-tight text-quaternary focus:outline-none"
      @change="updateInput"
    />
    <button class="focus:outline-none" @click="deleteInput()">
      <icons-close class="h-6 w-6 text-quinary" />
    </button>
  </div>
</template>

<script>
export default {
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
