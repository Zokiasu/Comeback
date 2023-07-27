<template>
  <div>
    <!-- <div
      class="sticky top-0 flex min-h-screen flex-col justify-between bg-quinary bg-opacity-10"
    >
      <ul class="space-y-5 p-5">
        <NuxtLink
          :to="`/dashboard/newArtist`"
          class="flex w-full rounded px-10 py-2"
          :class="
            $route.name !== 'dashboard-index-newArtist'
              ? 'hover:bg-quinary hover:bg-opacity-70'
              : 'bg-quinary'
          "
        >
          <p class="mx-auto truncate text-center">New Artist</p>
        </NuxtLink>
        <NuxtLink
          :to="`/dashboard/updateArtist`"
          class="flex w-full rounded px-10 py-2"
          :class="
            $route.name !== 'dashboard-index-updateArtist'
              ? 'hover:bg-quinary hover:bg-opacity-70'
              : 'bg-quinary'
          "
        >
          <p class="mx-auto truncate text-center">Update Artist</p>
        </NuxtLink>
        <NuxtLink
          :to="`/dashboard/artists`"
          class="flex w-full rounded px-10 py-2"
          :class="
            $route.name !== 'dashboard-index-artists'
              ? 'hover:bg-quinary hover:bg-opacity-70'
              : 'bg-quinary'
          "
        >
          <p class="mx-auto text-center">Artists</p>
        </NuxtLink>
        <NuxtLink
          :to="`/dashboard/releases`"
          class="flex w-full rounded px-10 py-2"
          :class="
            $route.name !== 'dashboard-index-releases'
              ? 'hover:bg-quinary hover:bg-opacity-70'
              : 'bg-quinary'
          "
        >
          <p class="mx-auto text-center">Releases</p>
        </NuxtLink>
        <NuxtLink
          :to="`/dashboard/news`"
          class="flex w-full rounded px-10 py-2"
          :class="
            $route.name !== 'dashboard-index-news'
              ? 'hover:bg-quinary hover:bg-opacity-70'
              : 'bg-quinary'
          "
        >
          <p class="mx-auto text-center">News</p>
        </NuxtLink>
        <NuxtLink
          :to="`/dashboard/styles`"
          class="flex w-full rounded px-10 py-2"
          :class="
            $route.name !== 'dashboard-index-styles'
              ? 'hover:bg-quinary hover:bg-opacity-70'
              : 'bg-quinary'
          "
        >
          <p class="mx-auto text-center">Styles</p>
        </NuxtLink>
        <NuxtLink
          :to="`/dashboard/users`"
          class="flex w-full rounded px-10 py-2"
          :class="
            $route.name !== 'dashboard-index-users'
              ? 'hover:bg-quinary hover:bg-opacity-70'
              : 'bg-quinary'
          "
        >
          <p class="mx-auto text-center">Users</p>
        </NuxtLink>
      </ul>
      <NuxtLink
        to="/"
        class="flex w-full items-center justify-center p-5 hover:bg-quinary"
      >
        <p class="font-semibold">Back to website</p>
      </NuxtLink>
    </div> -->
    <nav class="flex space-x-2 p-3">
      <NuxtLink
        to="#"
        class="flex w-full rounded px-10 py-2"
        :class="
          $route.name !== 'dashboard-index-newArtist'
            ? 'hover:bg-quinary hover:bg-opacity-70'
            : 'bg-quinary'
        "
      >
        <p class="mx-auto truncate text-center">Hello</p>
      </NuxtLink>
    </nav>
    <NuxtChild />
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  head() {
    return {
      title: 'Dashboard',
    }
  },
}
</script>
