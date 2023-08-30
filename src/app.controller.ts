import { Controller, Get, NotFoundException, Post, Query,Param, HttpStatus, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}


}
