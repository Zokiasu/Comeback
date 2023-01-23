<template>
  <a
    v-if="url"
    :href="url"
    target="_blank"
    class="Card flex space-x-1.5 rounded bg-black-two bg-opacity-90 p-2 px-3 text-tertiary hover:bg-opacity-50"
  >
    <div class="mt-1">
      <img :src="urls" />
    </div>
    <span v-if="name" class="linkName">{{ extractRootDomain(url) }}</span>
  </a>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    name: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      urls: '',
    }
  },

  created() {
    this.urls = 'https://www.google.com/s2/favicons?domain=' + this.url
  },

  methods: {
    extractRootDomain(url) {
      let domain = this.extractHostname(url)
      const splitArr = domain.split('.')
      const arrLen = splitArr.length
      // extracting the root domain here
      // if there is a subdomain
      if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1]
        // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (
          splitArr[arrLen - 2].length == 2 &&
          splitArr[arrLen - 1].length == 2
        ) {
          // this is using a ccTLD
          domain = splitArr[arrLen - 3] + '.' + domain
        }
      }
      // remove '.com'
      const n = domain.indexOf('.')
      domain = domain.substring(0, n != -1 ? n : domain.length)
      // Uppercase first letter
      let x = domain.charAt(0).toUpperCase() + domain.slice(1)
      if (x == 'Qq') {
        x = domain.toUpperCase()
      }
      if (
        x === 'Youtube' ||
        x === 'Apple' ||
        x === 'Huawei' ||
        x === 'Amazon' ||
        x === 'Line' ||
        x === 'QQ' ||
        x === 'Stingray'
      ) {
        x = x + ' Music'
      }
      if (url.includes('www.youtube')) {
        x = 'Youtube'
      }
      return x
    },

    extractHostname(url) {
      let hostname
      // find & remove protocol (http, ftp, etc.) and get hostname

      if (url.includes('//')) {
        hostname = url.split('/')[2]
      } else {
        hostname = url.split('/')[0]
      }

      // find & remove port number
      hostname = hostname.split(':')[0]
      // find & remove "?"
      hostname = hostname.split('?')[0]

      return hostname
    },
  },
}
</script>

<style>
@media screen and (max-width: 1024px) {
  .linkName {
    display: none !important;
  }
}
</style>
