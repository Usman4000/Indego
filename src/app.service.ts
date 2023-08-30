import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios'; // Import axios
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) { }

}
