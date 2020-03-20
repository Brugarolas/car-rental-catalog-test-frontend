<template>
  <span class="tag-color" :style="{ backgroundColor: cssColor }" :class="{ 'tag-color--big': big }">
    {{ text }}
  </span>
</template>

<script>
const DEFAULT_COLOR = '#2AC940';

const OTHER_COLORS = {
  blueyear: '#39f',
  fuscia: '#ff4167',
  mauv: '#996378',
  puce: '#722f38'
};

const isValidColor = (color) => {
  const style = new Option().style;
  style.color = color;
  return style.color !== '';
};

export default {
  name: 'TagColor',
  props: {
    text: {
      type: [String, Number],
      required: true
    },
    color: {
      type: String,
      default: DEFAULT_COLOR
    },
    big: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cssColor () {
      const color = (this.color || DEFAULT_COLOR).toLowerCase();

      return isValidColor(color) ? color : (OTHER_COLORS[color] || DEFAULT_COLOR);
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-color {
  display: inline-block;
  min-width: 38px;
  padding: 3px 6px;

  font-size: 10px;
  font-weight: normal;
  text-align: center;
  color: $white;
  background-color: #39f;
  overflow: hidden;
  border-radius: 2px;
  text-shadow: 1px 1px 0px $black; // text shadow in case background color is too bright

  &--big {
    font-size: 15px;
    padding: 4px 8px;
    min-width: 56px;
  }

  &:not(:last-of-type) {
    margin-right: 8px;
  }
}
</style>
