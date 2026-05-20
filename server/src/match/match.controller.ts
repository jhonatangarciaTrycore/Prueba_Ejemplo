import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchRequestDto } from './dto/match-request.dto';

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('match')
  @HttpCode(200)
  match(@Body() dto: MatchRequestDto) {
    return this.matchService.computeMatch(dto.candidato, dto.vacante);
  }
}
