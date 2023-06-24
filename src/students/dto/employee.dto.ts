import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Address {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly address: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly city: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly state: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly country: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  readonly pincode: number;
}

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly firstName: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  readonly lastName: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  readonly email: string;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Address)
  @ApiProperty({ required: true, type: Address })
  readonly address: Address;
}

export class GetEmployeeDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: true })
  readonly email?: string;
}

class UpdateAddress {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly address?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly city?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly state?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly country?: string;
  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  readonly pincode?: number;
}
export class UpdateEmployeeDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  readonly user_id: number;
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly firstName?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly lastName?: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddress)
  @ApiProperty({ required: false, type: UpdateAddress })
  readonly address?: UpdateAddress;
}

export class DeleteEmployeeDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  readonly user_id: number;
}
