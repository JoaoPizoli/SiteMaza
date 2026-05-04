import { IsString } from "class-validator";

export class CidadeResponseDto {

    @IsString()
    cidade: string;
}