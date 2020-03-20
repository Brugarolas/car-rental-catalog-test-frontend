<template>
  <section class="price">
    <h3 v-if="text" class="price__text">
      {{ text }}
    </h3>
    <p class="price__section">
      <span v-if="discount" class="price__discount">{{ initialPrice | formatWithCurrency(currency) }}</span>
      <span class="price__total">{{ price | formatWithCurrency(currency) }}</span>
    </p>
  </section>
</template>

<script>
export default {
  name: 'Price',
  props: {
    text: {
      type: [String, Number],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: '€'
    }
  },
  computed: {
    initialPrice () {
      return this.price + this.discount;
    }
  }
};
</script>

<style lang="scss" scoped>
.price {
  display: inline-block;

  .price__text {
    text-align: right;
    font-size: 12px;
    font-weight: normal;
    margin: 0;
  }

  .price__section {
    margin: 0;

    .price__discount {
      display: inline-block;
      color: $company-color;
      font-size: 20px;
      font-weight: normal;
      margin-right: 5px;
      text-decoration: line-through;
    }

    .price__total {
      display: inline-block;
      font-size: 24px;
      font-weight: 700;
    }
  }
}
</style>
