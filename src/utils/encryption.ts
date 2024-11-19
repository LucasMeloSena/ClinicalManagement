import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashProvider {
  async comparePassword(
    password: string,
    comparePassword: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, comparePassword);
  }

  async genSalt() {
    return await bcrypt.genSalt();
  }

  async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }
}
