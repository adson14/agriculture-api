import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Esta API tem por finalidade demonstrar as minhas habilidades em Node JS!';
  }
}
