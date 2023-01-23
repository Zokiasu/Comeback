<template>
  <section class="space-y-5">
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="w-40">
        <span>Change Password</span>
      </div>
      <div class="w-full">
        <button
          class="rounded border border-blue-700 bg-blue-500 bg-opacity-30 px-3 py-2"
        >
          Change Password
        </button>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="w-40">
        <span>Desactive your account ?</span>
      </div>
      <div class="w-full">
        <button
          class="border-bg-primary rounded border bg-red-500 bg-opacity-30 px-3 py-2"
        >
          Yes, desactive my account
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: '',
    }
  },
}
</script>

<style></style>
