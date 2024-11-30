import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { GqlExecutionContext } from '@nestjs/graphql';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class JwtGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const ctx = GqlExecutionContext.create(context);
      const req = ctx.getContext().req;
  
      // Extract token from Authorization header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Token is missing');
      }
  
      try {
        // Verify token and attach the user to the request object
        const user = this.jwtService.verify(token);
        req.user = user;
  
        return true;
      } catch (error) {
        console.error('JwtGuard -> Token verification failed:', error.message);
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  