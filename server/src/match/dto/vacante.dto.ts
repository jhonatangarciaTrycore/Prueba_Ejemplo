import {
    IsArray,
    IsInt,
    IsString,
    IsIn,
    IsDefined,
    ArrayNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class VacanteDto {
    @IsArray({
        message: 'skills_requeridas debe ser un arreglo de strings',
    })
    @IsString({
        each: true,
        message: 'cada skill debe ser un string',
    })
    skills_requeridas!: string[];

    @Transform(({ value }) =>
        value === '' || value === null ? undefined : Number(value),
    )
    @IsDefined({
        message: 'experiencia_min es requerido',
    })
    @IsInt({
        message: 'experiencia_min debe ser un número entero',
    })
    experiencia_min!: number;

    @IsDefined({
        message: 'tipo_contrato es requerido',
    })
    @IsString({
        message: 'tipo_contrato debe ser una cadena de texto',
    })
    @IsIn(
        ['indefinido', 'obra_labor', 'prestacion_servicios'],
        {
            message:
                'tipo_contrato debe ser uno de los siguientes valores: indefinido, obra_labor, prestacion_servicios',
        },
    )
    tipo_contrato!: string;
}