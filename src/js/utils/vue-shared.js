const shared = {};

/**
 * Plugin used for sharing some global flags and info which
 * don't belong to the store, and also useful as global bus
 * for emitting and listenig to events.
 */
shared.install = (Vue, options) => {
  // https://vuejs.org/v2/guide/reactivity.html#For-Objects
  Vue.prototype.$shared = new Vue({
    data: {
      hasPreviousRoute: false
    }
  });
};

export default shared;
