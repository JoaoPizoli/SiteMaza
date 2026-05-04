import { IsEmail, IsString } from "class-validator";


export class RepreResponseDto {

    @IsString()
    name: string;

    @IsString()
    company: string;

    @IsString()
    phone: string;

    @IsString()
    @IsEmail()
    email: string;
}