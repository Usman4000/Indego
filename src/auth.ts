import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NestMiddleware, Param, Query } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

 const TOKEN = 'Bearer my-secret-token';

@Injectable()
export class AuthGuard implements CanActivate {

canActivate(context: ExecutionContext) {
  const httpContext = context.switchToHttp();
  const request = httpContext.getRequest();
  const token = request.headers['authorization'];
  

    if (!token || token !== TOKEN) {
      throw new ForbiddenException();
    }

    return true;
  }
}