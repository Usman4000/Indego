import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios'; // Import axios
import { PrismaService } from './prisma/prisma.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) { }

  getHello(): string {
    return 'Hello World!';
  }

 @Cron('0 10 * * * *') // every hour, at the start of the 10th minute
async triggerSaveSnapshot(): Promise<void> {
   try {
      console.log('Cron check....');
      
      const response = await axios.get('https://bts-status.bicycletransit.workers.dev/phl'); // Fetch snapshot data
      const snapshotData = response.data; // Assuming the response data is structured correctly

      if (snapshotData && Array.isArray(snapshotData.features)) {
        await this.saveSnapshot(snapshotData.features); // Pass the features array to saveSnapshot
      } else {
        throw new Error('Invalid response data format');
      }
    } catch (error) {
      throw new Error('Failed to trigger snapshot save.');
    }
  }

  private async saveSnapshot(features: any[]): Promise<void> {
    try {
      // Iterate through the features array and perform your data transformation and saving logic
      for (const feature of features) {
        await this.saveFeature(feature);
      }
    } catch (error) {
      throw new Error('Failed to save snapshot.');
    }
  }

  private async saveFeature(snapshotData: any): Promise<void> {
    try {
      if (!snapshotData.properties || !snapshotData.properties.bikes) {
        console.error('Invalid snapshotData format:', snapshotData);
        return;
      }

      const stationData = {
        name: snapshotData.properties.name,
        totalDocks: snapshotData.properties.totalDocks,
        docksAvailable: snapshotData.properties.docksAvailable,
        bikesAvailable: snapshotData.properties.bikesAvailable,
        classicBikesAvailable: snapshotData.properties.classicBikesAvailable,
        smartBikesAvailable: snapshotData.properties.smartBikesAvailable,
        electricBikesAvailable: snapshotData.properties.electricBikesAvailable,
        rewardBikesAvailable: snapshotData.properties.rewardBikesAvailable,
        rewardDocksAvailable: snapshotData.properties.rewardDocksAvailable,
        kioskStatus: snapshotData.properties.kioskStatus,
        kioskPublicStatus: snapshotData.properties.kioskPublicStatus,
        kioskConnectionStatus: snapshotData.properties.kioskConnectionStatus,
        kioskType: snapshotData.properties.kioskType,
        addressStreet: snapshotData.properties.addressStreet,
        addressCity: snapshotData.properties.addressCity,
        addressState: snapshotData.properties.addressState,
        addressZipCode: snapshotData.properties.addressZipCode,
        closeTime: snapshotData.properties.closeTime,
        eventEnd: snapshotData.properties.eventEnd,
        eventStart: snapshotData.properties.eventStart,
        isEventBased: snapshotData.properties.isEventBased,
        isVirtual: snapshotData.properties.isVirtual,
        kioskId: snapshotData.properties.kioskId,
        notes: snapshotData.properties.notes,
        openTime: snapshotData.properties.openTime,
        publicText: snapshotData.properties.publicText,
        timeZone: snapshotData.properties.timeZone,
        trikesAvailable: snapshotData.properties.trikesAvailable,
        latitude: snapshotData.properties.latitude,
        longitude: snapshotData.properties.longitude,
        battery: {
          create: snapshotData.properties.bikes.map((bikeData: any) => ({
            dockNumber: bikeData.dockNumber,
            isElectric: bikeData.isElectric,
            isAvailable: bikeData.isAvailable,
            battery: bikeData.battery
          }))
        }
      };

      const createdStation = await this.prisma.station.create({
        data: stationData
      });

    } catch (error) {
      throw new Error('Failed to save snapshot.');
    }
  }

  async getStationsAtSpecificTime(timestamp: string) {
    try {
      const stations = await this.prisma.station.findMany({
        where: {
          timestamp: timestamp
        }
      });
      if (stations.length ===0) {
        throw new NotFoundException();
      }

      return stations;
    } catch (error) {
      throw new NotFoundException(error.message, error.statusCode);
    }
  }

    async getSpecificStationAtSpecificTime(kioskId: string, timestamp: string) {
    // Convert the timestamp to the appropriate format if needed
    try {
      const station = await this.prisma.station.findFirst({
        where: {
          AND: [ { kioskId: parseInt(kioskId) }, { timestamp: timestamp } ]
        }
      });
      if (!station) {
        throw new NotFoundException();
      }

      return station;
    } catch (error) {
      throw new NotFoundException(error.message, error.statusCode);
    }
  }




}
