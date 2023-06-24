import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Address } from './entities/employee_address.entity';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly EmployeeTable: Repository<Employee>,
    @InjectRepository(Address)
    private readonly EmployeeAddressTable: Repository<Address>,
  ) {}

  async getEmployee(email?: string): Promise<Employee[]> {
    if (!email) {
      const employee = await this.EmployeeTable.find();
      return employee;
    }
    const employee = await this.EmployeeTable.find({
      where: { email: email },
    });
    return employee;
  }

  async getEmployeeById(id?: number): Promise<Employee> {
    const employee = await this.EmployeeTable.findOne({
      where: { id: id },
    });
    return employee;
  }

  async createEmployee(data: CreateEmployeeDto) {
    const createAddress = this.EmployeeAddressTable.create(data.address);
    await this.EmployeeAddressTable.insert(createAddress);
    const createEmployee = this.EmployeeTable.create({
      ...data,
      address: createAddress,
    });
    const create = await this.EmployeeTable.insert(createEmployee);
    if (create) {
      return true;
    } else {
      return false;
    }
  }

  async updateEmployee(data: UpdateEmployeeDto, address_id: number) {
    const updateEmployee = await this.EmployeeTable.preload({
      id: data.user_id,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    const getAddress = await this.EmployeeAddressTable.preload({
      id: address_id,
      ...data.address,
    });
    const updatedEmployee = await this.EmployeeTable.save(updateEmployee);
    const updatedAddress = await this.EmployeeAddressTable.save(getAddress);
    if (updatedEmployee && updatedAddress) {
      return true;
    } else {
      return false;
    }
  }

  async deleteEmployee(id: number) {
    const deleteOne = await this.EmployeeAddressTable.delete(id);
    if (deleteOne.affected) {
      return true;
    } else {
      return false;
    }
  }
}
