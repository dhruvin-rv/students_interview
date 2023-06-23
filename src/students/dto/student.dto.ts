import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Address {
  @IsNotEmpty()
  @IsString()
  readonly address: string;
  @IsNotEmpty()
  @IsString()
  readonly city: string;
  @IsNotEmpty()
  @IsString()
  readonly state: string;
  @IsNotEmpty()
  @IsString()
  readonly country: string;
  @IsNotEmpty()
  @IsNumber()
  readonly pincode: number;
}

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Address)
  readonly address: Address;
}
