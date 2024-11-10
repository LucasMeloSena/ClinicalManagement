import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginNutritionistDto } from 'src/domain/dtos/nutritionist/login-nutritionist.dto';
import { INutritionistRepository } from 'src/domain/interfaces/nutritionist.repository';
import { HashProvider } from 'src/utils/encryption';
import { JwtAuthToken } from 'src/utils/jwt';

@Injectable()
export class LoginNutritionist {
  constructor(
    @Inject('INutritionistRepository')
    private readonly nutritionistRepository: INutritionistRepository,
    private readonly hashProvider: HashProvider,
    private readonly authProvider: JwtAuthToken,
  ) {}

  async execute(login: LoginNutritionistDto) {
    const nutritionist = await this.nutritionistRepository.findByEmail(
      login.email,
    );
    const validPass = await this.hashProvider.comparePassword(
      login.password,
      nutritionist.password,
    );
    if (validPass) {
      nutritionist.password = undefined;
      return {
        nutritionist,
        token: this.authProvider.genToken(nutritionist.email, nutritionist._id),
      };
    }
    throw new BadRequestException('Invalid Credentials.');
  }
}
