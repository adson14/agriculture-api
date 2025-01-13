import { CropPlanted } from '../modules/crops_planted/entities/crops_planted.entity';
import { Crop } from '../modules/crop/entities/crop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity('crop_culture')
@Unique(['crop', 'cropPlanted'])
export class CropCulture {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Crop, (crop) => crop.cropCultures, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'crop_id' })
  crop: Crop;

  @ManyToOne(() => CropPlanted, (cropPlanted) => cropPlanted.cropCultures, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'culture_id' })
  cropPlanted: CropPlanted;
}
