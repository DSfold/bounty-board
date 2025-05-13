import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bounty } from './entities/bounty.entity';

@Injectable()
export class BountyService {
  constructor(
    @InjectRepository(Bounty)
    private readonly bountyRepository: Repository<Bounty>
  ) {}

  async create(createBountyDto: CreateBountyDto, id: string) {
    const isExist = await this.bountyRepository.findBy({
      createdBy: { id },
      title: createBountyDto.title,
    });

    if (isExist.length)
      throw new BadRequestException('This bounty already exists');
    const newBounty = {
      title: createBountyDto.title,
      description: createBountyDto.description,
      target: createBountyDto.target,
      reward: createBountyDto.reward,
      planet: createBountyDto.planet,
      createdBy: { id },
    };

    return await this.bountyRepository.save(newBounty);
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
