import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BountyModule } from './bounty/bounty.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Bounty } from './bounty/entities/bounty.entity';

@Module({
  imports: [
    UserModule,
    BountyModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [__dirname + '/../../**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Bounty]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
