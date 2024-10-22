<template>
  <transition :name="transitionName" :mode="transitionMode" @leave="saveScroll" @enter="restoreScroll">
    <keep-alive max="5">
      <router-view />
    </keep-alive>
  </transition>
</template>

<script>
import RestoreScroll from '@/js/utils/restore-scroll';

const DEFAULT_TRANSITION = 'slide-left';
const DEFAULT_TRANSITION_MODE = 'out-in';

const calcPathSize = (path) => {
  return path === '/' ? 1 : path.split('/').length;
};

const calcTransitionName = (to, from) => {
  let transitionName = to.meta.transitionName || from.meta.transitionName || DEFAULT_TRANSITION;

  if (transitionName === 'slide') {
    const toDepth = calcPathSize(to.path);
    const fromDepth = calcPathSize(from.path);
    transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  }

  return transitionName;
};

export default {
  name: 'ViewManager',
  data () {
    return {
      transitionName: null,
      transitionMode: DEFAULT_TRANSITION_MODE,
      transitionEnterActiveClass: null,
      prevPath: null,
      nextPath: null
    };
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      const transitionName = calcTransitionName(to, from);

      this.transitionMode = DEFAULT_TRANSITION_MODE;
      this.transitionEnterActiveClass = `${transitionName}-enter-active`;
      this.transitionName = transitionName;
      this.prevPath = from.path;
      this.nextPath = to.path;
      this.$shared.hasPreviousRoute = true;

      next();
    });
  },
  methods: {
    saveScroll (el) {
      RestoreScroll.saveScrollPosition(el, this.prevPath);
    },
    restoreScroll (el) {
      RestoreScroll.restoreScrollPosition(el, this.nextPath);
    }
  }
};
</script>

<style lang="scss">
.vue-route-animation {
  will-change: transform;
}

/* Animation slide */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.4s;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
