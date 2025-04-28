import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthGuardsModule } from './auth-guards.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ThrottlerModule.forRoot([{
      ttl: 60, // Límite de 100 requests por minuto
      limit: 100,
    }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    AuthGuardsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
