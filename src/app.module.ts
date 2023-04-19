import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.entity';
import { PartnersModule } from './partners/partners.module';
import { Partner } from './partners/models/partner.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { WashersModule } from './washers/washers.module';
import { Washer } from './washers/models/washer.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User, Partner, Washer]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '6600',
      database: 'washerDB',
      entities: [User, Partner],
      synchronize: true,
    }),
    PartnersModule,
    WashersModule,
  ],
  controllers: [AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}

//  TODO signout - Learn Session
