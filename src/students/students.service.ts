import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Address } from './entities/student_address.entity';
import { CreateStudentDto } from './dto/student.dto';
@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly StudentTable: Repository<Student>,
    @InjectRepository(Address)
    private readonly StudentAddressTable: Repository<Address>,
  ) {}

  async getSingleStudent(email: string) {
    const student = await this.StudentTable.findOne({
      where: { email: email },
    });
    if (student) {
      return true;
    } else {
      return false;
    }
  }
  async createStudent(data: CreateStudentDto) {
    const { email, firstName, lastName, address } = data;
    const createAddress = this.StudentAddressTable.create(address);
    await this.StudentAddressTable.insert(createAddress);
    const createStudent = this.StudentTable.create({
      email,
      firstName,
      lastName,
      address: createAddress,
    });
    const create = await this.StudentTable.insert(createStudent);
    if (create) {
      return true;
    } else {
      return false;
    }
  }
}
