import vehicles from './vehicles.json';

const getVehicles = () => {
  // Return a promise to simulate data is fetched asynchronously
  return new Promise((resolve, reject) => {
    resolve(vehicles.map(vehicle => {
      const fields = [
        vehicle.brand,
        vehicle.model,
        vehicle.tags.color,
        vehicle.tags.year
      ];

      vehicle.searchField = fields.filter(field => field).join(' ').toLowerCase();

      return vehicle;
    }));
  });
};

export default { getVehicles };
