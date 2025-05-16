import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bounty } from './entities/bounty.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class BountyService {
  constructor(
    @InjectRepository(Bounty)
    private readonly bountyRepository: Repository<Bounty>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createBountyDto: CreateBountyDto, id: string) {
    const isExist = await this.bountyRepository.findBy({
      createdBy: { id },
      title: createBountyDto.title,
    });

    if (isExist.length)
      throw new BadRequestException('This bounty already exists');
    const activeUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    const newBounty = {
      title: createBountyDto.title,
      description: createBountyDto.description,
      target: createBountyDto.target,
      reward: createBountyDto.reward,
      planet: createBountyDto.planet,

      createdBy: activeUser,
    };

    return await this.bountyRepository.save(newBounty);
  }

  async findAll() {
    const allbounties = await this.bountyRepository.find({
      relations: { claimedBy: true },
      order: { createdAt: 'DESC' },
      select: {
        target: true,
        reward: true,
        title: true,
        id: true,
        planet: true,
        claimedBy: {
          id: true,
        },
      },
    });
    return allbounties;
  }

  async findAllCreatedBy(id: string) {
    return await this.bountyRepository.find({
      where: {
        createdBy: { id },
      },
      relations: {
        claimedBy: true,
      },
      order: { createdAt: 'DESC' },
      select: {
        target: true,
        reward: true,
        title: true,
        id: true,
        planet: true,
        claimedBy: {
          id: true,
        },
      },
    });
  }

  async findAllClaimedBy(id: string) {
    return await this.bountyRepository.find({
      where: {
        claimedBy: { id },
      },
      relations: {
        claimedBy: true,
      },
      order: { createdAt: 'DESC' },
      select: {
        target: true,
        reward: true,
        title: true,
        id: true,
        planet: true,
        claimedBy: {
          id: true,
        },
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
      select: {
        description: true,
        id: true,
        planet: true,
        reward: true,
        target: true,
        title: true,
        claimedBy: {
          id: true,
          email: true,
        },
        createdBy: {
          id: true,
          email: true,
        },
      },
    });

    if (!existingBounty) throw new NotFoundException('Bounty does not exist');
    return existingBounty;
  }

  async update(id: number, userId: string, updateBountyDto: UpdateBountyDto) {
    const existingBounty = await this.bountyRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    const activeUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!existingBounty) throw new NotFoundException('Bounty does not exist');
    if (existingBounty.createdBy.id === userId)
      throw new BadRequestException('Cannot claim your own bounty');
    return await this.bountyRepository.update(id, {
      ...updateBountyDto,
      claimedBy: { ...activeUser },
    });
  }

  async remove(id: number, userId: string) {
    const bounty = await this.bountyRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    if (!bounty) throw new NotFoundException('Bounty does not exist');
    return await this.bountyRepository.delete(id);
  }
}
