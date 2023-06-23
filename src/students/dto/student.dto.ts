import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  ValidateNested,
  IsOptional,
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

export class GetStudentDto {
  @IsOptional()
  @IsEmail()
  readonly email?: string;
}

class UpdateAddress {
  @IsOptional()
  @IsString()
  readonly address?: string;
  @IsOptional()
  @IsString()
  readonly city?: string;
  @IsOptional()
  @IsString()
  readonly state?: string;
  @IsOptional()
  @IsString()
  readonly country?: string;
  @IsOptional()
  @IsNumber()
  readonly pincode?: number;
}
export class UpdateStudentDto {
  @IsOptional()
  @IsEmail()
  readonly email?: string;
  @IsOptional()
  @IsString()
  readonly firstName?: string;
  @IsOptional()
  @IsString()
  readonly lastName?: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddress)
  readonly address?: UpdateAddress;
}
