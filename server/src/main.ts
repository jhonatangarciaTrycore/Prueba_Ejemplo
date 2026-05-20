import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,

            exceptionFactory: (errors: ValidationError[]) => {
                const extract = (errs: ValidationError[]): string[] => {
                    const messages: string[] = [];

                    const traverse = (error: ValidationError) => {
                        if (error.constraints) {
                            messages.push(...Object.values(error.constraints));
                        }

                        if (error.children?.length) {
                            error.children.forEach(traverse);
                        }
                    };

                    errs.forEach(traverse);

                    return messages;
                };

                return new BadRequestException({
                    errors: extract(errors),
                });
            },
        }),
    );

    await app.listen(process.env.PORT || 5000);
}

bootstrap();