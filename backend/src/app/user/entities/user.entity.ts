import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bounty } from '../../bounty/entities/bounty.entity';
import { Optional } from '@nestjs/common';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Bounty, (bounty) => bounty.createdBy, {
    onDelete: 'DEFAULT',
  })
  bountiesCreated: Bounty[];

  @OneToMany(() => Bounty, (bounty) => bounty.claimedBy)
  bountiesClaimed: Bounty[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
