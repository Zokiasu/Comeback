<template>
  <div class="flex flex-row">
    <div class="min-h-screen bg-gray-500 bg-opacity-10 sticky">
      <ul class="space-y-5 p-5 text-white">
        <li class="w-full px-10 py-2 rounded flex"
          :class="$route.name != 'dashboard-index-pending' ? 'hover:bg-gray-500 hover:bg-opacity-70' : 'bg-gray-500'">
          <NuxtLink :to="`/dashboard/pending`" class="mx-auto text-center">Pending</NuxtLink>
        </li>
        <li class="w-full px-10 py-2 rounded flex" 
          :class="$route.name != 'dashboard-index-artists' ? 'hover:bg-gray-500 hover:bg-opacity-70' : 'bg-gray-500'">
          <NuxtLink :to="`/dashboard/artists`" class="mx-auto text-center">Artists</NuxtLink>
        </li>
        <li class="w-full px-10 py-2 rounded flex" 
          :class="$route.name != 'dashboard-index-releases' ? 'hover:bg-gray-500 hover:bg-opacity-70' : 'bg-gray-500'">
          <NuxtLink :to="`/dashboard/releases`" class="mx-auto text-center">Releases</NuxtLink>
        </li>
        <li class="w-full px-10 py-2 rounded flex" 
          :class="$route.name != 'dashboard-index-musics' ? 'hover:bg-gray-500 hover:bg-opacity-70' : 'bg-gray-500'">
          <NuxtLink :to="`/dashboard/musics`" class="mx-auto text-center">Musics</NuxtLink>
        </li>
        <li class="w-full px-10 py-2 rounded flex" 
          :class="$route.name != 'dashboard-index-style' ? 'hover:bg-gray-500 hover:bg-opacity-70' : 'bg-gray-500'">
          <NuxtLink :to="`/dashboard/style`" class="mx-auto text-center">Style</NuxtLink>
        </li>
        <li class="w-full px-10 py-2 rounded flex" 
          :class="$route.name != 'dashboard-index-news' ? 'hover:bg-gray-500 hover:bg-opacity-70' : 'bg-gray-500'">
          <NuxtLink :to="`/dashboard/news`" class="mx-auto text-center">News</NuxtLink>
        </li>
        <li class="w-full px-10 py-2 rounded flex" 
          :class="$route.name != 'dashboard-index-users' ? 'hover:bg-gray-500 hover:bg-opacity-70' : 'bg-gray-500'">
          <NuxtLink :to="`/dashboard/users`" class="mx-auto text-center">Users</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="w-full h-full">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Dashboard"
    }
  },
}
</script>