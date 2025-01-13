import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateCropDto {
  @IsNotEmpty({ message: 'Nenhuma cultura informada' })
  @IsArray()
  culture_ids: string;
}
