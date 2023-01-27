<template>
  <div class="text-tertiary">
    <header
      class="
        animate__animated animate__fadeInDown
        sticky
        top-0
        z-50
        bg-background
      "
    >
      <MenuNavigation ref="menu" class="z-50" />
    </header>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<style>
html {
  background: #1f1d1d;
}

::-webkit-scrollbar {
  width: 5px; /* width of the entire scrollbar */
  height: 5px;
  margin: 5px;
}

::-webkit-scrollbar-track {
  background: transparent; /* color of the tracking area */
  height: 5px;
  margin: 5px;
}

::-webkit-scrollbar-track-piece {
  opacity: 50%;
}

::-webkit-scrollbar-thumb {
  background-color: #e1e1e1; /* color of the scroll thumb */
  border-radius: 50px; /* roundness of the scroll thumb */
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
