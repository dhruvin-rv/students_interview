import {
  Controller,
  Body,
  Res,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import {
  CreateEmployeeDto,
  DeleteEmployeeDto,
  GetEmployeeDto,
  UpdateEmployeeDto,
} from './dto/employee.dto';
import { Response } from 'express';
import { PAYLOAD_RESPONSE_STATUS } from 'src/common/enums/payload.enum';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import {
  CreateEmployResponse,
  DeleteEmployResponse,
  GetEmployResponse,
  UpdateEmployResponse,
} from './response/employee.response';

@ApiTags('Employees')
@Controller('employee')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  @ApiOperation({
    description: 'Create employ',
  })
  @ApiOkResponse({ type: CreateEmployResponse })
  async createEmployee(
    @Body() data: CreateEmployeeDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const exist = await this.employeeService.getEmployee(data.email);
      if (exist.length > 0) {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.FAILED,
          message: 'Employee already exist',
          data: null,
          error: null,
        };
        return response.status(HttpStatus.OK).json(responsePayload);
      }
      const create = await this.employeeService.createEmployee(data);
      if (create) {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.SUCCESS,
          message: 'Employ created successfully',
          data: null,
          error: null,
        };
        return response.status(HttpStatus.OK).json(responsePayload);
      } else {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.FAILED,
          message: 'Failed to create employee',
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
  @ApiOperation({
    description: 'Get all employee',
  })
  @ApiOkResponse({ type: GetEmployResponse })
  async getAllEmployee(
    @Query() data: GetEmployeeDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const employees = await this.employeeService.getEmployee(data.email);
      if (employees.length > 0) {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.SUCCESS,
          message: 'Employees found',
          data: employees,
          error: null,
        };
        return response.status(HttpStatus.OK).json(responsePayload);
      } else {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.FAILED,
          message: 'Employees not found',
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

  @Put()
  @ApiOperation({
    description: 'Update employee by employee id',
  })
  @ApiOkResponse({ type: UpdateEmployResponse })
  async updateEmployee(
    @Body() data: UpdateEmployeeDto,
    @Res() response: Response,
  ) {
    try {
      const employee = await this.employeeService.getEmployeeById(data.user_id);
      if (!employee) {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.FAILED,
          message: 'Failed to find employee',
          data: null,
          error: null,
        };
        return response.status(HttpStatus.OK).json(responsePayload);
      }
      const update = await this.employeeService.updateEmployee(
        data,
        employee.address.id,
      );
      if (update) {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.SUCCESS,
          message: 'Employee updated',
          data: null,
          error: null,
        };
        return response.status(HttpStatus.OK).json(responsePayload);
      } else {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.FAILED,
          message: 'Failed to update employee',
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

  @Delete()
  @ApiOperation({
    description: 'Delete employee by employee id',
  })
  @ApiOkResponse({ type: DeleteEmployResponse })
  async deleteEmployee(
    @Res() response: Response,
    @Query() data: DeleteEmployeeDto,
  ) {
    try {
      const checkEmployee = await this.employeeService.getEmployeeById(
        data.user_id,
      );
      if (!checkEmployee) {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.FAILED,
          message: 'Employee not found',
          data: null,
          error: null,
        };
        return response.status(HttpStatus.OK).json(responsePayload);
      }
      const deleteEmployee = await this.employeeService.deleteEmployee(
        checkEmployee.address.id,
      );
      if (deleteEmployee) {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.SUCCESS,
          message: 'Employee deleted successfully',
          data: null,
          error: null,
        };
        return response.status(HttpStatus.OK).json(responsePayload);
      } else {
        const responsePayload = {
          status: PAYLOAD_RESPONSE_STATUS.FAILED,
          message: 'Failed to delete employee',
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
