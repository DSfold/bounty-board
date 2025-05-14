import { Module } from '@nestjs/common';
import { BountyService } from './bounty.service';
import { BountyController } from './bounty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bounty } from './entities/bounty.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bounty]), User],
  controllers: [BountyController],
  providers: [BountyService],
})
export class BountyModule {}
