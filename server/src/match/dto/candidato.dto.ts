import { IsArray, IsInt, IsString, IsDefined, ArrayNotEmpty,} from 'class-validator';
import { Transform } from 'class-transformer';

export class CandidatoDto {

    @IsDefined({
        message: 'skills es requerido',
    })
    @IsArray({
        message: 'skills debe ser un arreglo',
    })
    @ArrayNotEmpty({
        message: 'skills no debe estar vacío',
    })
    @IsString({
        each: true,
        message: 'cada skill debe ser string',
    })
    skills!: string[];

    @Transform(({ value }) =>
        value === '' || value === null
            ? undefined
            : Number(value),
    )
    @IsDefined({
        message: 'experiencia_anios es requerido',
    })
    @IsInt({
        message: 'experiencia_anios debe ser un número entero',
    })
    experiencia_anios!: number;
}