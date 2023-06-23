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

  /**Address id of the user
   *Here we assume that we will not search user's by the address in future so
   * created Uni-directional relation
   */
  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
