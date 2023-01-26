<template>
  <div class="bg-quinary rounded p-5 relative">
    <div class="flex space-x-5">
      <img :src="picture" :alt="name" class="w-40 h-40 object-cover rounded" />
      <div class="space-y-2.5">
        <div v-if="name">
          <p class="font-bold">Name</p>
          <p>{{ name }}</p>
        </div>
        <div v-if="email">
          <p class="font-bold">Email</p>
          <p>{{ email }}</p>
        </div>
        <div v-if="role">
          <p class="font-bold">Role</p>
          <p>{{ role }}</p>
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <div v-if="country">
        <p class="font-bold">Country</p>
        <p>{{ country }}</p>
      </div>
      <div v-if="subscription">
        <p class="font-bold">Subscription</p>
        <p>{{ subscription }}</p>
      </div>
    </div>
    <div class="absolute top-2 right-2 space-y-2 flex flex-col">
      <button class="bg-quaternary/10 hover:bg-secondary px-2 py-1 rounded">
        Edit
      </button>
      <button class="bg-quaternary/10 hover:bg-secondary px-2 py-1 rounded">
        Delete
      </button>
      <button class="bg-quaternary/10 hover:bg-secondary px-2 py-1 rounded">
        Remove Personnal Data
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardUserView',
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      required: true,
    },
  },
}
</script>