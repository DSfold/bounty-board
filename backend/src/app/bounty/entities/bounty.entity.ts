import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Optional } from '@nestjs/common';

@Entity()
export class Bounty {
  @PrimaryGeneratedColumn({ name: 'bounty_id' })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  target: string;

  @Column()
  planet: string;

  @Column()
  reward: number;

  @ManyToOne(() => User, (user) => user.bountiesCreated)
  @JoinColumn({ name: 'createdBy_id' })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.bountiesClaimed)
  @JoinColumn({ name: 'claimedByBy_id' })
  @Optional()
  claimedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
