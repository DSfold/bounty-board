import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBountyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  target: string;

  @IsOptional()
  description: string;

  reward: number;

  planet: string;
}
