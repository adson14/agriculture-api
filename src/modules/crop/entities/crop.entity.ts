import { CropCulture } from '../../../entity/cropCulture.entity';
import { Farm } from '../../farm/entities/farm.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('crop')
export class Crop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  year: string;

  @ManyToOne(() => Farm, (farm) => farm.crops, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  @OneToMany(() => CropCulture, (cropCulture) => cropCulture.crop)
  cropCultures: CropCulture[];
}
