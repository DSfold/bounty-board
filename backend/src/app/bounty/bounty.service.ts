import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll() {
    return await this.bountyRepository.find({
      where: {
        claimedBy: { id: '' },
      },
    });
  }

  async findAllCreatedBy(id: string) {
    return await this.bountyRepository.find({
      where: {
        createdBy: { id },
      },
      relations: {
        claimedBy: true,
      },
    });
  }

  async findAllClaimedBy(id: string) {
    return await this.bountyRepository.find({
      where: {
        claimedBy: { id },
      },
      relations: {
        createdBy: true,
      },
    });
  }

  async findOne(id: number) {
    const existingBounty = await this.bountyRepository.findOne({
      where: { id },
      relations: {
        claimedBy: true,
        createdBy: true,
      },
    });

    if (!existingBounty) throw new NotFoundException('Bounty does not exist');
    return existingBounty;
  }

  async update(id: number, userId: string, updateBountyDto: UpdateBountyDto) {
    const existingBounty = await this.bountyRepository.findOne({
      where: { id },
    });
    if (!existingBounty) throw new NotFoundException('Bounty does not exist');
    if (existingBounty.createdBy.id === userId)
      throw new BadRequestException('Cannot claim your own bounty');
    return await this.bountyRepository.update(id, updateBountyDto);
  }

  async remove(id: number, userId: string) {
    const bounty = await this.bountyRepository.findOne({
      where: { id },
    });
    if (!bounty) throw new NotFoundException('Bounty does not exist');
    if (bounty.createdBy.id !== userId)
      throw new BadRequestException('Cannot delete bounty that is not yours');
    return await this.bountyRepository.delete(id);
  }
}
