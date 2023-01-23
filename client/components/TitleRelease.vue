<template>
  <div
    class="Card border-leftbar flex h-full cursor-pointer border-b border-opacity-30 px-5 py-2 hover:bg-background"
    :class="widthVideo == '100%' ? 'flex-col' : 'justify-between lg:flex-row'"
    @click="changeSize()"
  >
    <span
      class="my-auto"
      :class="
        widthVideo == '57' && heightVideo == '34'
          ? ''
          : 'text-2xl font-semibold'
      "
      >{{ title.name }}</span
    >
    <iframe
      :width="widthVideo"
      :height="heightVideo"
      :src="getYoutubeId(title.clip)"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'TitleRelease',

  props: ['title'],

  data() {
    return {
      widthVideo: '57',
      heightVideo: '34',
    }
  },

  methods: {
    changeSize() {
      if (this.widthVideo == '57' && this.heightVideo == '34') {
        this.openTitleInfo()
      } else {
        this.closeTitleInfo()
      }
    },

    openTitleInfo() {
      if (window.innerWidth < 768) {
        this.widthVideo = '100%'
        this.heightVideo = '340'
      } else {
        this.widthVideo = '570'
        this.heightVideo = '340'
      }
    },

    closeTitleInfo() {
      this.widthVideo = '57'
      this.heightVideo = '34'
    },

    getYoutubeId(url) {
      let id, fullId
      if (url?.includes('list=')) {
        id = url.split('list=')[1]
        fullId =
          'https://www.youtube.com/embed/videoseries?list=' +
          id +
          '?rel=0&modestbranding=1&autohide=1&showinfo=0'
      } else if (url?.includes('v=')) {
        id = url.split('v=')[1]
        fullId =
          'https://www.youtube.com/embed/' +
          id +
          '?rel=0&modestbranding=1&autohide=1&showinfo=0'
      } else if (url?.includes('.be/')) {
        id = url.split('.be/')[1]
        fullId =
          'https://www.youtube.com/embed/' +
          id +
          '?rel=0&modestbranding=1&autohide=1&showinfo=0'
      }
      return fullId
    },
  },
}
</script>

<style></style>
