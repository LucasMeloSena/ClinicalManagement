import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      message: 'Welcome to ClinicalManagement',
      date: new Date(),
    };
  }
}
