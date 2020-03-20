<template>
  <button class="menu-button" :class="{ 'menu-button--open': open }" @click="click">
    <span class="menu-button__line top" />
    <span class="menu-button__line center" />
    <span class="menu-button__line bottom" />
  </button>
</template>

<script>
export default {
  name: 'MenuButton',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click (event) {
      event.stopPropagation();

      this.$emit('click', !this.open);
    }
  }
};
</script>

<style lang="scss" scoped>
$lines: 3;
$line-width: 100%;
$line-height: 4px;
$line-separation: 5px;
$line-color: #333;

$button-width: 30px;
$button-height: ($line-height * $lines) + ($line-separation * ($lines - 1));

@mixin line {
  position: absolute;
  left: 0;
  display: inline-block;
  width: $line-width;
  height: $line-height;
  background-color: $line-color;
  transition: all .2s;
}

.menu-button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  outline: none;
  text-decoration: none;
  background: transparent;
  cursor: pointer;

  @include unselectable();

  position: relative;
  width: $button-width;
  height: $button-height;

  .menu-button__line {
    @include line();

    &.center {
      top: 50%;
      transform: translateY(-50%);
      transform-origin: center;
    }

    &.top {
      top: 0;
    }

    &.bottom {
      bottom: 0;
    }
  }

  &--open .menu-button__line {
    &.center {
      background: transparent;
      transform: translateY(-50%) scaleX(0);
    }

    &.top {
      transform: rotate(135deg);
      top: $line-height + $line-separation;
    }

    &.bottom {
      transform: rotate(-135deg);
      bottom: $line-height + $line-separation;
    }
  }
}
</style>
