import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Farm } from '../../farm/entities/farm.entity';
import { CropCulture } from '../../../entity/cropCulture.entity';

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

  @OneToMany(() => CropCulture, (cropCulture) => cropCulture.cropPlanted)
  cropCultures: CropCulture[];
}
