<template>
  <header class="header">
    <img :src="logo" alt="Bipi Logo" class="header__logo">

    <nav class="header__navbar only-visible-above-tablet">
      <router-link :to="{ name: 'Index' }" class="header__link">
        Catálogo
      </router-link>

      <router-link v-if="hasLastVisited" :to="{ name: 'Vehicle', params: { id: lastVisited } }" class="header__link">
        Último coche visitado
      </router-link>
    </nav>

    <FloatingMenu class="header__menu-button not-visible-above-tablet">
      <router-link :to="{ name: 'Index' }" class="header__link">
        Catálogo
      </router-link>

      <router-link v-if="hasLastVisited" :to="{ name: 'Vehicle', params: { id: lastVisited } }" class="header__link">
        Último coche visitado
      </router-link>
    </FloatingMenu>
  </header>
</template>

<script>
import FloatingMenu from '@/js/components/FloatingMenu.vue';
import { mapGetters, mapState } from 'vuex';
import logo from '@/img/logo.svg';

export default {
  name: 'Header',
  components: {
    FloatingMenu
  },
  data () {
    return {
      logo
    };
  },
  computed: {
    ...mapGetters('vehicles', ['hasLastVisited']),
    ...mapState('vehicles', ['lastVisited'])
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: $z-index-header;

  width: 100%;
  height: 60px;
  padding: 0 20px;

  background-color: $white;
  box-shadow: 0 0 12px 8px $shadow-color;

  .header__logo {
    padding: 14px 0;
    height: 100%;
  }

  .header__link {
    display: inline-block;
    color: $main-text-color;
    font-size: 14px;
    text-transform: uppercase;
    padding: 10px 0;
    cursor: pointer;
    transition: transform .2s ease-in-out;
    transform-origin: center left;

    &:hover {
      transform: scale(1.05);
    }
  }

  .header__navbar {
    margin-left: 40px;

    .header__link {
      margin-right: 32px;
      transform-origin: center;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  @include respond-above(tablet) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
