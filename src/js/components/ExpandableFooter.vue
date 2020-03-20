<template>
  <footer ref="element" class="expandable" :class="{ expanded: isExpanded }">
    <button class="expandable__button" @click="expandInfo">
      Ver info
    </button>

    <div class="expandable__wrapper">
      <div class="expandable__content">
        <slot />
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'ExpandableFooter',
  data () {
    return {
      isExpanded: false
    };
  },
  mounted () {
    document.body.addEventListener('click', this.hideInfo);
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.hideInfo);
  },
  methods: {
    expandInfo (event) {
      event.stopPropagation();

      this.isExpanded = !this.isExpanded;
    },
    hideInfo (event) {
      if (this.isExpanded && this.$refs.element && !this.$refs.element.contains(event.target)) {
        this.isExpanded = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$background-color-mobile: #2B3647;
$button-height: 72px;

.expandable {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  color: $white;
  pointer-events: none;

  .expandable__button {
    position: absolute;
    left: 0;
    bottom: 0;
    color: $white;
    pointer-events: all;

    border: none;
    outline: none;
    text-decoration: none;
    background: transparent;

    display: block;
    width: 100%;
    margin: 24px 0 26px 0;
    font-size: 18px;
    font-weight: normal;
    text-align: center;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    z-index: $z-index-header;

    &:hover {
      transform: scale(1.05);
    }
  }

  .expandable__content {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .expandable__wrapper {
    width: 100%;
    padding: 32px 20px 36px 20px;
    border-radius: 5px 5px 0 0;
    background-color: $background-color-mobile;

    transform: translateY(calc(100% - #{$button-height}));
    transition: transform 0.2s ease-in-out;
  }

  &.expanded {
    pointer-events: all;

    .expandable__wrapper {
      transform: translateY(0);
    }

    .expandable__content {
      opacity: 1;
    }

    .expandable__button {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
