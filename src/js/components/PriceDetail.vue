<template>
  <dl class="price-detail">
    <dt class="price-detail__key">
      Precio
    </dt>
    <dd class="price-detail__value">
      {{ initialPrice | formatWithCurrency(currency) }}
    </dd>

    <dt class="price-detail__key">
      Descuento
    </dt>
    <dd class="price-detail__value discount">
      {{ discount | checkDiscount(discountApply) | formatWithCurrency(currency) }}
    </dd>

    <dt class="price-detail__key important">
      Precio Total
    </dt>
    <dd class="price-detail__value important">
      {{ price | formatWithCurrency(currency) }}
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'PriceDetail',
  filters: {
    checkDiscount: function (value, apply = true) {
      return apply ? -value : 0;
    }
  },
  props: {
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    discountApply: {
      type: Boolean,
      default: false
    },
    currency: {
      type: String,
      default: '€'
    }
  },
  computed: {
    initialPrice () {
      return this.discountApply ? this.price + this.discount : this.price;
    }
  }
};
</script>

<style lang="scss" scoped>
.price-detail {
  display: flow-root;
  width: 100%;
  overflow: hidden;
  margin: 0;

  .price-detail__key {
    font-size: 18px;
    float: left;
    text-align: left;
    width: 70%;
    margin-bottom: 12px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .price-detail__value {
    font-size: 18px;
    float: right;
    text-align: right;
    width: 30%;
    margin: 0;
    margin-bottom: 12px;
    font-weight: bold;

    &:last-of-type {
      margin-bottom: 0;
    }

    &.discount {
      font-weight: normal;
      color: $company-color;
    }
  }

  .price-detail__key.important, .price-detail__value.important {
    font-weight: bold;
    font-weight: 21px;
    margin-top: 30px;
  }
}
</style>
