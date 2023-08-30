import {
	Controller,
	Get,
	NotFoundException,
	Post,
	Query,
	Param,
	HttpStatus,
	HttpException,
	UseGuards
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

  @UseGuards(AuthGuard)
	@Post('api/v1/stations')
	async saveSnapshot(): Promise<any> {
		try {
			await this.appService.triggerSaveSnapshot(); // Call the async method in the service
			return { message: 'Snapshot saved successfully' };
		} catch (error) {
			return { error: 'Failed to save snapshot' };
		}
	}

	@UseGuards(AuthGuard) 
	@Get('api/v1/stations')
	getStationsAtSpecificTime(@Query('at') timestamp: string) {
		return this.appService.getStationsAtSpecificTime(timestamp);
	}

  @UseGuards(AuthGuard)
	@Get('api/v1/stations/:kioskId')
	getSpecificStationAtSpecificTime(@Query('kioskId') kioskId: string, @Query('at') timestamp: string) {
		try {
			const result = this.appService.getSpecificStationAtSpecificTime(kioskId, timestamp);
			return result;
		} catch (error) {
			throw new HttpException('Not found', 404);
		}
	}
}
