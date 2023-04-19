import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Partner } from 'src/partners/models/partner.entity';

@Entity()
export class Washer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  features: string[];

  @OneToOne((type) => Partner, (partner) => partner.washer)
  @JoinColumn()
  owner: Partner;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  working_hours: string;

  @Column({ nullable: true })
  working_days: string;

  @Column({ nullable: true })
  ymaps_id: number;
}
