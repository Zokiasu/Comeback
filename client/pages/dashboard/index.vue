<template>
  <div class="flex flex-row">
    <div
      class="
        min-h-screen
        sticky
        top-0
        flex flex-col
        justify-between
        bg-gray-500 bg-opacity-10
        text-tertiary
      "
    >
      <ul class="space-y-5 p-5">
        <li
          class="w-full px-10 py-2 rounded flex"
          :class="
            $route.name != 'dashboard-index-newArtist'
              ? 'hover:bg-gray-500 hover:bg-opacity-70'
              : 'bg-gray-500'
          "
        >
          <NuxtLink
            :to="`/dashboard/newArtist`"
            class="mx-auto text-center truncate"
            >New Artist</NuxtLink
          >
        </li>
        <li
          class="w-full px-10 py-2 rounded flex"
          :class="
            $route.name != 'dashboard-index-updateArtist'
              ? 'hover:bg-gray-500 hover:bg-opacity-70'
              : 'bg-gray-500'
          "
        >
          <NuxtLink
            :to="`/dashboard/updateArtist`"
            class="mx-auto text-center truncate"
            >Update Artist</NuxtLink
          >
        </li>
        <li
          class="w-full px-10 py-2 rounded flex"
          :class="
            $route.name != 'dashboard-index-artists'
              ? 'hover:bg-gray-500 hover:bg-opacity-70'
              : 'bg-gray-500'
          "
        >
          <NuxtLink :to="`/dashboard/artists`" class="mx-auto text-center"
            >Artists</NuxtLink
          >
        </li>
        <li
          class="w-full px-10 py-2 rounded flex"
          :class="
            $route.name != 'dashboard-index-releases'
              ? 'hover:bg-gray-500 hover:bg-opacity-70'
              : 'bg-gray-500'
          "
        >
          <NuxtLink :to="`/dashboard/releases`" class="mx-auto text-center"
            >Releases</NuxtLink
          >
        </li>
        <li
          class="w-full px-10 py-2 rounded flex"
          :class="
            $route.name != 'dashboard-index-musics'
              ? 'hover:bg-gray-500 hover:bg-opacity-70'
              : 'bg-gray-500'
          "
        >
          <NuxtLink :to="`/dashboard/musics`" class="mx-auto text-center"
            >Musics</NuxtLink
          >
        </li>
        <li
          class="w-full px-10 py-2 rounded flex"
          :class="
            $route.name != 'dashboard-index-style'
              ? 'hover:bg-gray-500 hover:bg-opacity-70'
              : 'bg-gray-500'
          "
        >
          <NuxtLink :to="`/dashboard/style`" class="mx-auto text-center"
            >Style</NuxtLink
          >
        </li>
        <li
          class="w-full px-10 py-2 rounded flex"
          :class="
            $route.name != 'dashboard-index-news'
              ? 'hover:bg-gray-500 hover:bg-opacity-70'
              : 'bg-gray-500'
          "
        >
          <NuxtLink :to="`/dashboard/news`" class="mx-auto text-center"
            >News</NuxtLink
          >
        </li>
        <li
          class="w-full px-10 py-2 rounded flex"
          :class="
            $route.name != 'dashboard-index-users'
              ? 'hover:bg-gray-500 hover:bg-opacity-70'
              : 'bg-gray-500'
          "
        >
          <NuxtLink :to="`/dashboard/users`" class="mx-auto text-center"
            >Users</NuxtLink
          >
        </li>
      </ul>
      <div class="w-full flex items-center justify-center p-5">
        <NuxtLink to="/" class="font-semibold">Back to website</NuxtLink>
      </div>
    </div>
    <div class="w-full min-h-screen overflow-y-auto">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  head() {
    return {
      title: "Dashboard",
    };
  },
};
</script>