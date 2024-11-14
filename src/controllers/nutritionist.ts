import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginNutritionistDto } from 'src/domain/dtos/nutritionist/login-nutritionist.dto';
import { Nutritionist } from 'src/domain/models/Nutritionist';
import { FindAllNutritionists } from 'src/domain/use-cases/nutritionist/find-all';
import { LoginNutritionist } from 'src/domain/use-cases/nutritionist/login';

@ApiTags('nutritionist')
@Controller('nutritionist')
export class NutritionistController {
  constructor(
    private readonly login: LoginNutritionist,
    private readonly findAll: FindAllNutritionists,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Find All Nutritionists' })
  @ApiResponse({
    status: 200,
    description: 'All nutritionists retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getAll(): Promise<HttpResponse<Nutritionist[]>> {
    const nutritionists = await this.findAll.execute();
    return {
      data: nutritionists,
      message: 'All nutritionists retrieved successfully.',
    };
  }

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
