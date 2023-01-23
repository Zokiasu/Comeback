<template>
  <div class="p-5 text-tertiary lg:px-40 lg:py-10">
    <section>
      <ul class="flex">
        <NuxtLink
          :to="`/setting/profile`"
          class="rounded-t-xl py-1 px-5"
          :class="$route.name == 'setting-index-profile' ? 'bg-gray-three' : ''"
          >Profile</NuxtLink
        >
        <NuxtLink
          :to="`/setting/security`"
          class="rounded-t-xl py-1 px-5"
          :class="
            $route.name == 'setting-index-security' ? 'bg-gray-three' : ''
          "
          >Security</NuxtLink
        >
        <!--<NuxtLink :to="`/setting/subscription`" class="py-1 px-5 rounded-t-xl" :class="$route.name == 'setting-index-subscription' ? 'bg-gray-three':''">Subscription</NuxtLink>-->
      </ul>
    </section>
    <section class="space-y-5 bg-gray-three p-10">
      <NuxtChild />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
    }
  },

  beforeCreate() {
    if (
      this.$router.currentRoute.name != 'setting-index-profile' &&
      this.$router.currentRoute.name != 'setting-index-security'
    )
      this.$router.push(`/setting/profile`)
  },
}
</script>

<style></style>
