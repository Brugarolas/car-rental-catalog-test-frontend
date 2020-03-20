<template>
  <div class="floating-menu" :class="{ 'floating-menu--open': open }">
    <MenuButton :open="open" class="floating-menu__button" @click="openMenu" />

    <nav class="floating-menu__navbar">
      <slot />
    </nav>
  </div>
</template>

<script>
import MenuButton from '@/js/components/MenuButton.vue';

export default {
  name: 'FloatingMenu',
  components: {
    MenuButton
  },
  data () {
    return {
      open: false
    };
  },
  mounted () {
    document.body.addEventListener('click', this.hideMenu);
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.hideMenu);
  },
  methods: {
    openMenu (open) {
      this.open = open;
    },
    hideMenu (event) {
      if (this.open) {
        this.open = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.floating-menu {
  .floating-menu__button {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    z-index: 8;
  }

  .floating-menu__navbar {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 55px;
    right: 0;
    width: 100%;
    z-index: $z-index-menu;
    background-color: $white;
    padding: 0 20px 20px 20px;
    box-shadow: 0 8px 4px 0px $shadow-color;
    transform: translateX(105%);
    transition: transform .4s ease-in-out;
  }

  &--open {
    .floating-menu__navbar {
      transform: translateX(0);
    }
  }
}
</style>
