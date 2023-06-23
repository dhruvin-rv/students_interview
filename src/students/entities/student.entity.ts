import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Address } from './student_address.entity';
import { ENTITY } from 'src/common/enums/entity.enum';

@Entity({ name: ENTITY.STUDENT })
export class Student {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column()
  readonly firstName: string;
  @Column()
  readonly lastName: string;
  @Column({ unique: true })
  readonly email: string;
  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
