import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthGuard } from './auth';
import { WeatherService } from './weather.service';

@Module({
  imports: [PrismaModule,
  ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService,AuthGuard,WeatherService],
})
export class AppModule {}
