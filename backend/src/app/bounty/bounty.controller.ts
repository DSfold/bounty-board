import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BountyService } from './bounty.service';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('bounty')
export class BountyController {
  constructor(private readonly bountyService: BountyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createBountyDto: CreateBountyDto, @Req() req) {
    return this.bountyService.create(createBountyDto, req.user.number);
  }

  @Get()
  findAll() {
    return this.bountyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bountyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBountyDto: UpdateBountyDto) {
    return this.bountyService.update(+id, updateBountyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bountyService.remove(+id);
  }
}
