import { PartialType } from '@nestjs/mapped-types';
import { CreateBountyDto } from './create-bounty.dto';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class UpdateBountyDto extends PartialType(CreateBountyDto) {
  @IsNotEmpty()
  claimedBy: User;
}
