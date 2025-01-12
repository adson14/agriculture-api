import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Producer } from '../../producer/entities/producer.entity';

@Entity('farm')
export class Farm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 45 })
  city: string;

  @Column({ type: 'varchar', length: 45 })
  state: string;

  @Column({ type: 'float', nullable: true })
  total_area: number;

  @Column({ type: 'float', nullable: true })
  farming_area: number;

  @Column({ type: 'float', nullable: true })
  vegetation_area: number;

  @ManyToOne(() => Producer, (producer) => producer.farms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'producer_id' })
  producer: Producer;
}
