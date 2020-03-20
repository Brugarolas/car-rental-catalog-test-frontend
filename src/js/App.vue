<template>
  <div id="app">
    <Header />

    <ViewManager />
  </div>
</template>

<script>
import Header from '@/js/components/Header';
import ViewManager from '@/js/routes/ViewManager';

export default {
  name: 'App',
  components: {
    Header, ViewManager
  }
};
</script>

<style lang="scss">
@import '@/styles/app.scss';

#app {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding-top: 60px; // header height
}

.footer-mobile {
  display: block;
  position: fixed;
  z-index: $z-index-header;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
