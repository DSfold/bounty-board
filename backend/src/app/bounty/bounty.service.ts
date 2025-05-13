import { Injectable } from '@nestjs/common';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';

@Injectable()
export class BountyService {
  create(createBountyDto: CreateBountyDto) {
    return 'This action adds a new bounty';
  }

  findAll() {
    return `This action returns all bounty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bounty`;
  }

  update(id: number, updateBountyDto: UpdateBountyDto) {
    return `This action updates a #${id} bounty`;
  }

  remove(id: number) {
    return `This action removes a #${id} bounty`;
  }
}
