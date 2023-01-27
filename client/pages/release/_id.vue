<template>
  <div
    class="head container mx-auto w-full p-5 md:p-10 lg:flex lg:items-center"
  >
    <div class="mx-auto w-fit space-y-5 lg:space-y-10">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold lg:text-5xl">{{ release.name }}</h1>
        <div class="flex gap-2">
          <p class="text-2xl">{{ release.type }} -</p>
          <nuxt-link :to="`/artist/${release.artistsId}`">
            <h2 class="hover-underline-animation text-2xl">
              {{ release.artistsName }}
            </h2>
          </nuxt-link>
        </div>
        <div
          v-if="release.platforms"
          class="flex flex-wrap gap-3 overflow-x-scroll"
        >
          <cb-external-link
            v-for="link in release.platforms"
            :key="link"
            :href="link"
            class="hover:bg-black/50"
          />
        </div>
      </div>
      <div class="flex w-fit flex-col gap-10 lg:flex-row xl:gap-20">
        <div class="mx-auto h-fit w-fit">
          <img
            :src="release.image"
            class="h-1/3 rounded-md bg-gray-300 shadow-2xl shadow-quinary"
          />
        </div>
        <div
          class="
            overflow-hidden overflow-y-scroll
            pr-5
            pb-2
            lg:h-[34rem] lg:w-[30rem]
          "
        >
          <ul class="space-y-5">
            <li
              v-for="music in release.music"
              :key="music.id"
              class="flex items-center justify-between gap-5"
            >
              <div class="flex items-center gap-5">
                <img
                  :alt="music.name"
                  :src="release.image"
                  class="
                    h-14
                    w-14
                    rounded-md
                    bg-gray-300
                    shadow-2xl shadow-quinary
                  "
                />
                <div>
                  <h3 class="font-semibold">{{ music.name }}</h3>
                  <nuxt-link :to="`/artist/${release.artistsId}`">
                    <p class="hover-underline-animation flex text-left">
                      {{ release.artistsName }}
                    </p>
                  </nuxt-link>
                </div>
              </div>
              <a :href="`https://youtu.be/${music.videoId}`" target="_blank">
                <icons-play class="h-8 w-8" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $fire }) {
    const release = await $fire.firestore
      .collection('releases')
      .doc(params.id)
      .get()
      .then((doc) => {
        const res = doc.data()
        return $fire.firestore
          .collection('releases')
          .doc(res.id)
          .collection('musics')
          .get()
          .then((snap) => {
            res.music = snap.docs.map((doc) => doc.data())
            return $fire.firestore
              .collection('artists')
              .doc(res.artistsId)
              .get()
              .then((docs) => {
                res.artist = docs.data()
                return res
              })
          })
      })

    return { release }
  },
}
</script>

<style>
.head {
  min-height: calc(100vh - 4rem);
}
</style>
