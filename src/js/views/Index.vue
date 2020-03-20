<template>
  <main class="scrolling page-container vue-route-animation catalog">
    <template v-if="hasVehicles">
      <div class="catalog__header">
        <h1 class="catalog__title">
          Catálogo
        </h1>

        <SearchForm class="catalog__search" :text="filter" @change="setFilter" />
      </div>

      <ul class="catalog__list">
        <VehiclePreview v-for="vehicle in filteredVehicles" :key="vehicle.id" :vehicle="vehicle" tag-name="li" class="catalog__list__item" />
      </ul>
    </template>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import VehiclePreview from '@/js/components/VehiclePreview';
import SearchForm from '@/js/components/SearchForm';

export default {
  name: 'ViewIndex',
  components: {
    VehiclePreview, SearchForm
  },
  data () {
    return {
      filter: ''
    };
  },
  computed: {
    ...mapState('vehicles', ['vehicles']),
    ...mapGetters('vehicles', ['hasVehicles', 'filterVehicles']),
    filteredVehicles () {
      if (!this.filter) {
        return this.vehicles;
      }

      return this.filterVehicles(this.filter);
    }
  },
  methods: {
    setFilter (filter) {
      this.filter = filter;
    }
  }
};
</script>

<style lang="scss" scoped>
.catalog {
  padding: 20px;

  .catalog__header {
    display: flex;
    flex-direction: column;
  }

  .catalog__title {
    font-weight: normal;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 30px;
  }

  .catalog__search {
    margin: 5px 0 40px 0;
  }

  @include respond-above(tablet) {
    .catalog__header {
      flex-direction: row;
      align-items: center;
    }

    .catalog__title {
      margin-bottom: 0;
    }

    .catalog__search {
      margin: 0;
      margin-left: auto;
      max-width: 420px;
    }

    .catalog__list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>
