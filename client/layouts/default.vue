<template>
  <div class="text-tertiary">
    <header
      ref="header"
      class="animate__animated animate__fadeInDown sticky top-0 w-full z-50 transition-all duration-150 ease-in-out"
    >
      <MenuNavigation />
    </header>
    <main ref="main" class="min-h-screen">
      <Nuxt />
    </main>
    <footer>
      <LazyFooter />
    </footer>
  </div>
</template>

<script>
export default {
  watch: {
    $route() {
      if (this.$route.path === '/') {
        setTimeout(() => {
          this.$refs.header.classList.remove('sticky')
          this.$refs.header.classList.add('absolute')
        }, 500)
      } else {
        setTimeout(() => {
          this.$refs.header.classList.remove('absolute')
          this.$refs.header.classList.add('sticky')
        }, 500)
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    if (this.$route.path === '/') {
      this.$refs.header.classList.remove('sticky')
      this.$refs.header.classList.add('absolute')
    } else {
      this.$refs.header.classList.remove('absolute')
      this.$refs.header.classList.add('sticky')
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 50) {
        this.$refs.header.classList.add('bg-secondary')
      } else {
        this.$refs.header.classList.remove('bg-secondary')
      }
    },
  },
}
</script>

<style>
html {
  background: #1f1d1d;
}

/* Styles de la barre de défilement */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  margin: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
  height: 5px;
  margin: 5px;
}

::-webkit-scrollbar-track-piece {
  opacity: 50%;
}

::-webkit-scrollbar-thumb {
  background-color: #e1e1e1;
  border-radius: 50px;
  opacity: 0; /* Le thumb est transparent par défaut */
  transition: opacity 0.3s ease-in-out; /* Ajoute une transition en douceur lors du changement d'opacité */
}

/* Fait apparaître le thumb lorsqu'on scroll */
::-webkit-scrollbar-thumb:hover,
::-webkit-scrollbar-thumb:active {
  opacity: 1; /* Change l'opacité du thumb à 1 lorsqu'il est survolé ou activé */
}

/* Page Transitions - 0.4s Slide/Fade */
.page-enter-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}
.page-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.page-enter {
  opacity: 0;
}

.page-leave-active {
  opacity: 0;
}
</style>
