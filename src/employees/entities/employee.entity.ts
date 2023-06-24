import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Address } from './employee_address.entity';
import { ENTITY } from 'src/common/enums/entity.enum';

@Entity({ name: ENTITY.EMPLOYEE })
export class Employee {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column()
  readonly firstName: string;
  @Column()
  readonly lastName: string;
  @Column({ unique: true })
  readonly email: string;

  /**Address id of the user
   * Here we assume that we will not search user's by the address in future so
   * created Uni-directional relation
   */
  @OneToOne(() => Address, {
    // cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  readonly address: Address;
}
