import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Farm } from '../../farm/entities/farm.entity';

@Entity('crops_planted')
export class CropPlanted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, unique: true })
  name: string;

  @ManyToOne(() => Farm, (farm) => farm.crops, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;
}
