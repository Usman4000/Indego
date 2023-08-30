import { Controller, Get, NotFoundException, Post, Query,Param, HttpStatus, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

@Get()
  getHello(): string {
    return this.appService.getHello();
}
	
  @Post('api/v1/stations')
  async saveSnapshot(): Promise<any> {
    try {
      await this.appService.triggerSaveSnapshot(); // Call the async method in the service
      return { message: 'Snapshot saved successfully' };
    } catch (error) {
      return { error: 'Failed to save snapshot' };
    }
  }

  @Get('api/v1/stations')
  getStationsAtSpecificTime(@Query('at') timestamp: string) {
    return this.appService.getStationsAtSpecificTime(timestamp);
  }


}
