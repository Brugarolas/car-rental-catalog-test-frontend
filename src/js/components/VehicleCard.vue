<template>
  <section class="vehicle-card">
    <h1 class="vehicle-card__name">
      {{ vehicle.brand }} <strong>{{ vehicle.model }}</strong>
    </h1>

    <div class="vehicle-card__tags">
      <TagColor v-if="vehicle.tags.color" :text="vehicle.tags.color" :color="vehicle.tags.color" big />
      <TagColor v-if="vehicle.tags.year" :text="vehicle.tags.year" color="blueyear" big />
    </div>

    <img alt="Vehicle Picture" class="vehicle-card__picture" :src="vehicle.image">
  </section>
</template>

<script>
import TagColor from '@/js/components/TagColor';

export default {
  name: 'VehicleCard',
  components: { TagColor },
  props: {
    vehicle: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
$content-padding: 15px;

.vehicle-card {
  position: relative;

  display: block;
  width: 100%;
  height: 278px;
  padding: $content-padding;

  border: 2px solid $border-color;
  border-radius: 5px;

  margin-bottom: 20px;

  .vehicle-card__name {
    margin: 0;
    font-size: 40px;
    font-weight: normal;
    font-style: oblique;
  }

  .vehicle-card__tags {
    margin: 2px 0;
  }

  .vehicle-card__picture {
    position: absolute;
    display: block;
    bottom: 0;
    right: 50%;
    max-width: 100%;
    max-height: 75%;
    transform: translateX(50%);
    z-index: $z-index-images;
  }

  @include respond-above(tablet) {
    height: 562px;
    margin-right: 20px;

    .vehicle-card__picture {
      bottom: 50%;
      max-height: 100%;
      transform: translate(50%, 50%);
    }
  }
}
</style>
