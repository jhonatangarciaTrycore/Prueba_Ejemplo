import { ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { CandidatoDto } from './candidato.dto';
import { VacanteDto } from './vacante.dto';

export class MatchRequestDto {
    @IsDefined({
        message: 'candidato es requerido',
    })
    @ValidateNested()
    @Type(() => CandidatoDto)
    candidato!: CandidatoDto;

    @IsDefined({
        message: 'vacante es requerida',
    })
    @ValidateNested()
    @Type(() => VacanteDto)
    vacante!: VacanteDto;
}