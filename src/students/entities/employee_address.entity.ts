import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ENTITY } from 'src/common/enums/entity.enum';
import { Employee } from './employee.entity';

@Entity({ name: ENTITY.ADDRESS })
export class Address {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column()
  readonly address: string;
  @Column()
  readonly city: string;
  @Column()
  readonly state: string;
  @Column()
  readonly country: string;
  @Column()
  readonly pincode: number;
}
