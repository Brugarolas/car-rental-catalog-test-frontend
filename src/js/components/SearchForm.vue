<template>
  <form class="search-form" :class="{ 'search-form--active': hasText, 'search-form--focus': hasFocus }" @submit="prevent">
    <i class="search-form__icon"><IconMagnifyingGlass /></i>
    <input v-model="textModel" type="text" class="search-form__input" @focusin="focus(true)" @focusout="focus(false)">
    <span class="search-form__label">Filtrar catálogo</span>
    <span class="search-form__reset" @click="reset"><i class="search-form__reset__icon">+</i></span>
  </form>
</template>

<script>
import IconMagnifyingGlass from '@/js/components/IconMagnifyingGlass';

export default {
  name: 'SearchForm',
  components: { IconMagnifyingGlass },
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      hasFocus: false
    };
  },
  computed: {
    hasText () {
      return Boolean(this.textModel);
    },
    textModel: {
      get () {
        return this.text;
      },
      set (value) {
        this.$emit('change', value);
      }
    }
  },
  methods: {
    prevent (event) {
      event.preventDefault();
    },
    focus (value) {
      this.hasFocus = value;
    },
    reset (event) {
      this.textModel = '';
    }
  }
};
</script>

<style lang="scss" scoped>
$form-size: 48px;
$font-size: 16px;
$input-margin: 16px;
$icon-size: 24px;
$icon-margin: ($form-size - $icon-size) / 2;
$left-input-margin: $input-margin + $icon-size + $icon-margin;

$border-color: #666;
$background-color: #f5f5f5;

.search-form {
  position: relative;
  height: $form-size;
  width: 100%;
  padding-left: $left-input-margin;
  background-color: $background-color;
  box-shadow: inset 0 -2px 0 0 $border-color;
  border-radius: 5px;

  .search-form__icon {
    position: absolute;
    left: $icon-margin;
    top: $icon-margin;
    display: block;
    height: $icon-size;
    width: $icon-size;
  }

  .search-form__input {
    background-color: transparent;
    border: 0;
    margin: 0;
    padding: $input-margin $form-size 0 0;
    width: 100%;
    height: 100%;
    font-size: $font-size;
    outline: 0;
    color: $main-text-color;
    -webkit-appearance: none;
    caret-color: $main-text-color;
    will-change: transform;
  }

  .search-form__label {
    position: absolute;
    z-index: $z-index-header;
    top: 0;
    left: $left-input-margin;

    padding-right: $form-size;
    font-size: $font-size;
    color: $border-color;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform: translateY(($form-size - $font-size) / 2);
    transform-origin: left center;
    transition: all 0.2s ease-in-out;
    pointer-events: none;

    @include unselectable();
  }

  .search-form__reset {
    display: inline-block;
    box-sizing: border-box;
    background-color: $red;
    border-radius: 50%;
    width: $icon-size - 1px;
    height: $icon-size - 1px;
    cursor: pointer;

    position: absolute;
    right: $icon-margin + 1px;
    top: $icon-margin + 1px;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: all .2s ease-in-out;

    @include unselectable();

    .search-form__reset__icon {
      position: absolute;
      top: calc(50% - 1px);
      left: calc(50% - 1px);

      display: inline-block;
      cursor: pointer;
      background: none;
      font-size: $icon-size;
      border: none;
      color: $white;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  &--active .search-form__label, .search-form__input:focus ~ .search-form__label {
    transform: translateY(0) scale(0.8);
  }

  &--active:hover .search-form__reset, &--active.search-form--focus .search-form__reset {
    visibility: visible;
    opacity: 1;
    pointer-events: all;
  }
}
</style>
