import { ApiProperty } from '@nestjs/swagger';
import { PAYLOAD_RESPONSE_STATUS } from 'src/common/enums/payload.enum';

export class CreateEmployResponse {
  @ApiProperty({ example: PAYLOAD_RESPONSE_STATUS.SUCCESS })
  status: number;
  @ApiProperty({ example: 'Employ created successfully' })
  message: string;
  @ApiProperty({ example: null })
  data: string;
  @ApiProperty({ example: null })
  error: string;
}

export class GetEmployResponse {
  @ApiProperty({ example: PAYLOAD_RESPONSE_STATUS.SUCCESS })
  status: number;
  @ApiProperty({ example: 'Employees found' })
  message: string;
  @ApiProperty({
    example: [
      {
        id: 1,
        firstName: 'Dhruvin',
        lastName: 'Vaghasiya',
        email: 'dhruvinvaghasiya11@gmail.com',
        address: {
          id: 1,
          address: 'b-120, gajanan soc. yogichowk, punagam',
          city: 'Surat',
          state: 'Gujarat',
          country: 'India',
          pincode: 395010,
        },
      },
    ],
  })
  data: string;
  @ApiProperty({ example: null })
  error: string;
}

export class UpdateEmployResponse {
  @ApiProperty({ example: PAYLOAD_RESPONSE_STATUS.SUCCESS })
  status: number;
  @ApiProperty({ example: 'Employee updated' })
  message: string;
  @ApiProperty({ example: null })
  data: string;
  @ApiProperty({ example: null })
  error: string;
}

export class DeleteEmployResponse {
  @ApiProperty({ example: PAYLOAD_RESPONSE_STATUS.SUCCESS })
  status: number;
  @ApiProperty({ example: 'Employee deleted successfully' })
  message: string;
  @ApiProperty({ example: null })
  data: string;
  @ApiProperty({ example: null })
  error: string;
}
