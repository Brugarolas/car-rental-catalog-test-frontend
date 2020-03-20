<template>
  <component :is="tagName" class="vehicle-preview">
    <router-link :to="{ name: 'Vehicle', params: { id: vehicle.id } }" class="vehicle-preview__wrapper-link">
      <h2 class="vehicle-preview__name">
        {{ vehicle.brand }} <strong>{{ vehicle.model }}</strong>
      </h2>

      <div class="vehicle-preview__tags">
        <TagColor v-if="vehicle.tags.color" :text="vehicle.tags.color" :color="vehicle.tags.color" />
        <TagColor v-if="vehicle.tags.year" :text="vehicle.tags.year" color="blueyear" />
      </div>

      <Price
        text="desde"
        :price="vehicle.price | priceToNumber"
        :discount="vehicle.offerDiscount | priceToNumber(vehicle.isOnOffer)"
        class="vehicle-preview__price"
      />

      <img alt="Vehicle Picture" class="vehicle-preview__picture" :src="vehicle.image">
    </router-link>
  </component>
</template>

<script>
import TagColor from '@/js/components/TagColor';
import Price from '@/js/components/Price';

export default {
  name: 'VehiclePreview',
  components: { TagColor, Price },
  filters: {
    priceToNumber: function (value, apply = true) {
      if (!apply) {
        return 0;
      }

      return Number(value);
    }
  },
  props: {
    vehicle: {
      type: Object,
      required: true
    },
    tagName: {
      type: String,
      default: 'div'
    }
  }
};
</script>

<style lang="scss" scoped>
$content-padding: 15px;

.vehicle-preview {
  display: block;
  position: relative;
  width: 100%;
  height: 236px;

  border: 2px solid $border-color;
  border-radius: 5px;

  margin-bottom: 20px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    box-shadow: 0 0 25px 5px $shadow-color;

    opacity: 0;
    transition: opacity .2s ease-in-out;
  }

  .vehicle-preview__wrapper-link {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    padding: $content-padding;
    color: $main-text-color;
  }

  .vehicle-preview__name {
    margin: 0;
    font-size: 24px;
    font-weight: normal;
    font-style: oblique;
  }

  .vehicle-preview__tags {
    margin: 2px 0;
  }

  .vehicle-preview__price {
    position: absolute;
    right: $content-padding;
    bottom: $content-padding;
  }

  &:hover::before {
    opacity: 1;
  }

  .vehicle-preview__picture {
    position: absolute;
    display: block;
    bottom: 28px;
    right: 50%;
    max-width: 100%;
    max-height: 65%;
    transform: translateX(50%);
    z-index: $z-index-images;
  }

  @include respond-above(tablet) {
    width: 295px;
    margin: 20px;

    .vehicle-preview__picture {
      bottom: 45px;
      max-height: 50%;
    }
  }
}
</style>
