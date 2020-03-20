<template>
  <a class="back-button" @click="goBack">
    <IconLeft class="back-button__icon" />
    <span v-if="text" class="back-button__text">{{ text }}</span>
  </a>
</template>

<script>
import IconLeft from '@/js/components/IconLeft';

export default {
  name: 'BackButton',
  components: { IconLeft },
  props: {
    text: {
      type: String,
      default: undefined
    }
  },
  methods: {
    goBack () {
      if (this.$shared.hasPreviousRoute) {
        this.$router.back();
      } else {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.back-button {
  display: inline-block;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  @include unselectable();

  &:hover {
    transform: scale(1.05);
  }

  .back-button__icon {
    color: $company-color;
    width: 6px;
  }

  .back-button__text {
    font-size: 16px;
    margin-left: 8px;
  }
}
</style>
