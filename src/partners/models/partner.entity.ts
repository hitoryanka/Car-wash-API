import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Washer } from '../../washers/models/washer.entity';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne((type) => Washer)
  @JoinColumn()
  washer: Washer;
}
