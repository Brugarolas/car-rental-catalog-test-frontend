<template>
  <main class="page-container vue-route-animation">
    <article class="scrolling detail">
      <BackButton text="Ir al catálogo" />

      <div v-if="vehicle" class="detail__main-content">
        <VehicleCard :vehicle="vehicle" class="detail__item" />

        <section class="detail__item">
          <Description title="Descripción" :description="vehicle.description" class="detail__description" />

          <div class="detail__price-wrapper only-visible-above-tablet">
            <PriceDetail
              v-if="vehicle"
              class="detail__price"
              :price="vehicle.price | toNumber"
              :discount="vehicle.offerDiscount | toNumber"
              :discount-apply="vehicle.isOnOffer"
            />
          </div>
        </section>
      </div>
    </article>

    <ExpandableFooter class="not-visible-above-tablet">
      <PriceDetail
        v-if="vehicle"
        :price="vehicle.price | toNumber"
        :discount="vehicle.offerDiscount | toNumber"
        :discount-apply="vehicle.isOnOffer"
      />
    </ExpandableFooter>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import BackButton from '@/js/components/BackButton';
import VehicleCard from '@/js/components/VehicleCard';
import Description from '@/js/components/Description';
import PriceDetail from '@/js/components/PriceDetail';
import ExpandableFooter from '@/js/components/ExpandableFooter';
import { SET_LAST_VISITED } from '@/js/store/modules/vehicles/mutation-types';

export default {
  name: 'ViewVehicleDetail',
  components: {
    BackButton, VehicleCard, Description, PriceDetail, ExpandableFooter
  },
  data () {
    return {
      vehicle: null
    };
  },
  computed: {
    ...mapGetters('vehicles', ['findVehicle'])
  },
  activated () {
    const { id } = this.$route.params;

    this.vehicle = this.findVehicle(id);
    this[SET_LAST_VISITED](id);
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params;

    this.vehicle = this.findVehicle(id);
    this[SET_LAST_VISITED](id);

    next();
  },
  methods: {
    ...mapMutations('vehicles', [SET_LAST_VISITED])
  }
};
</script>

<style lang="scss">
$description-background-color: #f1f5f9;

.detail {
  padding: 20px;

  .detail__item {
    margin-top: 40px;

    &:last-child {
      margin-bottom: 100px;
    }
  }

  @include respond-above(tablet) {
    .detail__main-content {
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-start;
    }

    .detail__item {
      flex: 1 auto;
    }

    .detail__description {
      background-color: $description-background-color;
      padding: 20px;
      border-radius: 5px;
      border: 2px solid $border-color;
    }

    .detail__price-wrapper {
      padding: 0 10px;
    }

    .detail__price {
      padding: 15px 24px 15px 28px;
      border: 2px solid $border-color;
      border-top: none;
      border-radius: 0 0 5px 5px;
    }
  }
}
</style>
