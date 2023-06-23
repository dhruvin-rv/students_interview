import {
  Controller,
  Body,
  Req,
  Res,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto, GetStudentDto } from './dto/student.dto';
import { Response } from 'express';
import { PAYLOAD_RESPONSE_STATUS } from 'src/common/enums/payload.enum';

@Controller('student')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Post()
  async createStudent(
    @Body() data: CreateStudentDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const exist = await this.studentService.getStudent(data.email);
      if (exist.length > 0) {
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

  @Get()
  async getAllStudent(
    @Query() data: GetStudentDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const students = await this.studentService.getStudent(data.email);
      if (students.length > 0) {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.SUCCESS,
          message: 'Students found',
          data: students,
          error: null,
        };
        return response.status(HttpStatus.OK).json(responsePayload);
      } else {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.FAILED,
          message: 'Students not found',
          data: [],
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
