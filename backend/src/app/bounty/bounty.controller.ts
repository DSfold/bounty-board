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
  UsePipes,
  ValidationPipe,
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
  @UsePipes(new ValidationPipe())
  create(@Body() createBountyDto: CreateBountyDto, @Req() req) {
    return this.bountyService.create(createBountyDto, req.user.number);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllCreatedBy(@Req() req) {
    return this.bountyService.findAllCreatedBy(req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllClaimedBy(@Req() req) {
    return this.bountyService.findAllClaimedBy(req.user.id);
  }

  @Get()
  findAll() {
    return this.bountyService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.bountyService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() updateBountyDto: UpdateBountyDto
  ) {
    return this.bountyService.update(+id, req.user.id, updateBountyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.bountyService.remove(+id, req.user.id);
  }
}
