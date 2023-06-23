import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Address } from './entities/student_address.entity';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly StudentTable: Repository<Student>,
    @InjectRepository(Address)
    private readonly StudentAddressTable: Repository<Address>,
  ) {}

  async getStudent(email?: string): Promise<Student[]> {
    if (!email) {
      const student = await this.StudentTable.find();
      return student;
    }
    const student = await this.StudentTable.find({
      where: { email: email },
    });
    return student;
  }

  async createStudent(data: CreateStudentDto) {
    const createAddress = this.StudentAddressTable.create(data.address);
    await this.StudentAddressTable.insert(createAddress);
    const createStudent = this.StudentTable.create({
      ...data,
      address: createAddress,
    });
    const create = await this.StudentTable.insert(createStudent);
    if (create) {
      return true;
    } else {
      return false;
    }
  }

  async updateStudent(data: UpdateStudentDto) {}
}
