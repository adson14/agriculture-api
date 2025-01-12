import { Farm } from '../../farm/entities/farm.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 45 })
  document: string;

  @Column({ type: 'varchar', length: 10 })
  doc_type: string;

  @OneToMany(() => Farm, (farm) => farm.producer)
  farms?: Farm[];
}
