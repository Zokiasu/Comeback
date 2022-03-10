<template>
  <div>
    <div class="animate__animated animate__fadeInDown sticky top-0 z-50 bg-background">
      <MenuNavigation ref="menu" class="z-50"/>
    </div>
    <div>
      <Nuxt/>
    </div>
    <!--<button class="bg-red-700 lg:hidden rounded-full bottom-5 right-5 p-2 shadow Card fixed">
      <img class="block h-8 w-auto" src="../assets/image/mini-logo.png" alt="Comeback">
    </button>-->
  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #1F1D1D;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
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
  background-color: #E1E1E1; /* color of the scroll thumb */
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
