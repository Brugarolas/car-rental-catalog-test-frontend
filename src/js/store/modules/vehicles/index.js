import VehiclesService from '@/js/services/vehicles.js';

const defaultState = {
  vehicles: [],
  vehiclesMap: new Map(),
  lastVisited: null
};

const getters = {
  hasVehicles (state) {
    return state.vehicles && state.vehicles.length > 0;
  },
  hasLastVisited (state) {
    return Boolean(state.lastVisited);
  },
  findVehicle: (state) => (id) => {
    // state.vehicles.find(v => v.id === id) is not escalable - map.get(id) is more performant
    return state.vehiclesMap.get(id);
  },
  hasVehicle: (state) => (id) => {
    return state.vehiclesMap.has(id);
  },
  filterVehicles: (state) => (filter) => {
    // if list is too long probably filter had to be done in the back end...
    const regExp = new RegExp(filter, 'i');

    return state.vehicles.filter((vehicle) => regExp.test(vehicle.searchField));
  }
};

const mutations = {
  addVehicle (state, vehicle) {
    state.vehicles.push(vehicle);

    state.vehiclesMap.set(vehicle.id, vehicle);
  },
  addVehicles (state, vehicles) {
    state.vehicles.push(...vehicles);

    vehicles.forEach(vehicle => {
      state.vehiclesMap.set(vehicle.id, vehicle);
    });
  },
  removeVehicles (state, id) {
    const vehicleExist = state.vehiclesMap.has(id);

    if (vehicleExist) {
      const index = state.vehicles.findIndex(vehicle => vehicle.id === id);

      if (index > -1) { // defensive programming: index should never be -1, we checked vehicle exist
        state.vehicles.splice(index, 1);
      }
    }
  },
  setLastVisited (state, id) {
    state.lastVisited = id;
  }
};

const actions = {
  fetchVehicles (context) {
    if (context.getters.hasVehicles) {
      return;
    }

    return VehiclesService.getVehicles()
      .then((vehicles) =>
        context.commit('addVehicles', vehicles)
      );
  }
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  mutations,
  actions
};
