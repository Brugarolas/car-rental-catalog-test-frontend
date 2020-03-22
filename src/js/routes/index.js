import Index from '@/js/views/Index';
import VehicleDetail from '@/js/views/VehicleDetail';
import store from '@/js/store';

const goBack = (from, next) => {
  const hasPrevRoute = Boolean(from.name);

  next(hasPrevRoute ? false : '/');
};

const loadVehicles = (to, from, next) => {
  store.dispatch('vehicles/fetchVehicles');
  next(); // we don't need to wait
};

const checkVehicleExist = (to, from, next) => {
  store.dispatch('vehicles/fetchVehicles').then(() => {
    const vehicleId = to.params.id;

    if (store.getters['vehicles/hasVehicle'](vehicleId)) {
      return next();
    }

    console.log(false);

    return goBack(from, next);
  }).catch(_ => {
    console.error(_);
    // empty - should show error message or something in the future
  });
};

const routes = [
  { path: '/', component: Index, name: 'Index', meta: { transitionName: 'slide' }, beforeEnter: loadVehicles },
  { path: '/vehicle/:id', component: VehicleDetail, name: 'Vehicle', meta: { transitionName: 'slide' }, beforeEnter: checkVehicleExist }
];

export default routes;
