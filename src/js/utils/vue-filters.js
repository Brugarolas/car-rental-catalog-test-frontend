const filters = {};

filters.install = (Vue, options) => {
  Vue.filter('formatWithCurrency', function (value, currency) {
    return `${value.toFixed(2)}${currency}`;
  });

  Vue.filter('toNumber', function (value) {
    return Number(value);
  });
};

export default filters;
