import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from "dotenv"
dotenv.config()

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const acces_token_secret = process.env.ACCESS_TOKEN_SECRET
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: acces_token_secret
            });
            request['user'] = payload;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | null {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return null;
        }
        const [bearer, token] = authHeader.split(' ');
        return bearer === 'Bearer' ? token : null;
    }
}
