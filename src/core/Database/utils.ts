import { faker } from '@faker-js/faker';
import { ILocation, LocationModel } from '../../models/location.model';

const generateLocations = (count: number): ILocation[] => {
  const locations: ILocation[] = [];

  for (let i = 0; i < count; i++) {
    locations.push({
      name: faker.company.name(),
      address: faker.location.streetAddress(),
      score: parseFloat((Math.random() * 100).toFixed(1)),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    } as ILocation);
  }

  return locations;
};

export const insertLocations = async (): Promise<void> => {
  try {
    // Check if the collection has data
    const existingCount = await LocationModel.countDocuments();

    if (existingCount) {
      console.log(
        `✅ Database already contains ${existingCount} locations.\n🚶 Skipping data generation.`
      );
      return;
    }

    console.log('😒 No locations found.\n🔃 Generating data...');

    // Generate and insert 10,000 locations
    const locations = generateLocations(10000);
    await LocationModel.insertMany(locations);

    console.log('✅ Successfully inserted 10,000 locations.');
  } catch (error) {
    console.error('❌ Error ensuring data exists:', error);
  }
};
