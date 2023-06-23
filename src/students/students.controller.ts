import {
  Controller,
  Body,
  Req,
  Res,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/student.dto';
import { Response } from 'express';
import { PAYLOAD_RESPONSE_STATUS } from 'src/common/enums/payload.enum';

@Controller('student')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Post()
  async createStudent(
    @Body() data: CreateStudentDto,
    @Res() response: Response,
  ) {
    try {
      const exist = await this.studentService.getSingleStudent(data.email);
      if (exist) {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.FAILED,
          message: 'Student already exist',
          data: null,
          error: null,
        };
        return response.status(HttpStatus.OK).json(responsePayload);
      }
      const create = await this.studentService.createStudent(data);
      if (create) {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.SUCCESS,
          message: 'Student created successfully',
          data: null,
          error: null,
        };
        return response.status(HttpStatus.OK).json(responsePayload);
      } else {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.FAILED,
          message: 'Failed to create student',
          data: null,
          error: null,
        };
        return response.status(HttpStatus.OK).json(responsePayload);
      }
    } catch (error) {
      if (error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
