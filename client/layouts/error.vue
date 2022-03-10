<template>
  <div class="text-white flex justify-center items-center h-screen">
    <div class="flex flex-col text-center space-y-32">
      <h1 v-if="error.statusCode === 404" class="text-2xl lg:text-9xl">404. Page not found</h1>
      <h1 v-else>An error occurred</h1>
      <div>
        <NuxtLink to="/" class="bg-red-700 hover:bg-red-900 px-5 py-2 rounded Card">Home page</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>