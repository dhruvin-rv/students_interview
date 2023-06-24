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
