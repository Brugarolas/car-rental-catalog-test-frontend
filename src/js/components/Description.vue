<template>
  <div class="description">
    <h2 class="description__title">
      {{ title }}
    </h2>

    <p v-for="paragraph in paragraphs" :key="paragraph" class="description__text">
      {{ paragraph }}
    </p>
  </div>
</template>

<script>

export default {
  name: 'Description',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: [Array, String],
      required: true
    }
  },
  computed: {
    paragraphs () {
      if (Array.isArray(this.description)) {
        return this.description;
      }

      return this.description.split('\n\n');
    }
  }
};
</script>

<style lang="scss" scoped>
.description {
  .description__title {
    font-size: 24px;
    font-weight: normal;
    font-style: oblique;
    margin: 10px 0;
  }

  .description__text {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
