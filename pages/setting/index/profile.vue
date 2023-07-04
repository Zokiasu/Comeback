<template>
  <section class="space-y-5">
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="w-32">
        <span>Profile Picture</span>
      </div>
      <div>
        <img class="h-40 w-40" src="" alt="" />
      </div>
      <div class="lg:mt-auto">
        <button class="Card rounded-md bg-primary px-5 py-2 focus:outline-none">
          Upload
        </button>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="w-32">
        <span>Display Name</span>
      </div>
      <div class="w-full">
        <t-input
          v-model="data"
          type="text"
          placeholder="Display Name"
          name="displayName"
        ></t-input>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="w-32">
        <span>ID User</span>
      </div>
      <div class="w-full">
        <t-input
          v-model="data"
          type="id"
          disabled
          placeholder="ID User"
          name="idUser"
        ></t-input>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="w-32">
        <span>Email</span>
      </div>
      <div class="w-full">
        <t-input
          v-model="data"
          type="email"
          placeholder="Email"
          name="email"
        ></t-input>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="w-32">
        <span>Location</span>
      </div>
      <div class="w-full">
        <t-input
          v-model="data"
          type="text"
          placeholder="Location"
          name="location"
        ></t-input>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="w-32">
        <span>Gender</span>
      </div>
      <div class="w-full">
        <t-input
          v-model="data"
          type="text"
          placeholder="Gender"
          name="gender"
        ></t-input>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="w-32">
        <span>Birthday</span>
      </div>
      <div class="w-full">
        <t-datepicker
          v-model="data"
          class="text-black"
          placeholder="Birthday"
          initial-view="month"
          date-format="Y-m-d"
          clearable
        >
        </t-datepicker>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="w-32">
        <span>Presentation</span>
      </div>
      <div class="w-full">
        <t-textarea
          v-model="data"
          type="text"
          placeholder="Presentation"
          name="presentation"
        ></t-textarea>
      </div>
    </div>
    <div class="flex justify-end">
      <button class="Card rounded-md bg-blue-500 px-5 py-2 focus:outline-none">
        Save Changes
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      user: null,
    }
  },
}
</script>

<style></style>
