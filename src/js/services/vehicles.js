import fetch from '@/js/utils/fetch-ponyfill';
import vehiclesFallback from './vehicles.json';
import { VEHICLES_URL } from '@/js/constants';

const adaptVehicle = (vehicle) => {
  const fields = [
    vehicle.brand,
    vehicle.model,
    vehicle.tags.color,
    vehicle.tags.year
  ];

  vehicle.searchField = fields.filter(field => field).join(' ').toLowerCase();

  return vehicle;
};

const getVehicles = async () => {
  try {
    const response = await fetch(VEHICLES_URL || 'http://localhost/');
    const data = await response.json();

    return data.vehicles.map(adaptVehicle);
  } catch (error) {
    // Fallback - in case server fails somehow
    return vehiclesFallback.map(adaptVehicle);
  }
};

export default { getVehicles };
