import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginNutritionistDto } from 'src/domain/dtos/nutritionist/login-nutritionist.dto';
import { Nutritionist } from 'src/domain/models/Nutritionist';
import { LoginNutritionist } from 'src/domain/use-cases/nutritionist/login';

@ApiTags('nutritionist')
@Controller('nutritionist')
export class NutritionistController {
  constructor(private readonly login: LoginNutritionist) {}

  @Post('login')
  @ApiOperation({ summary: 'Login Nutritionist' })
  @ApiResponse({ status: 200, description: 'Nutritionist successfully login.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @HttpCode(200)
  async loginNutritionist(
    @Body() loginRequestDto: LoginNutritionistDto,
  ): Promise<
    HttpResponse<{ nutritionist: Nutritionist; token: Record<string, string> }>
  > {
    const response = await this.login.execute(loginRequestDto);
    return {
      data: response,
      message: 'Nutritionist successfully login.',
    };
  }
}
