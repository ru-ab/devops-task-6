import { Controller, Get, Post } from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get()
  get() {
    return this.counterService.getCounter();
  }

  @Post('increment')
  increment() {
    return this.counterService.increment();
  }

  @Post('decrement')
  decrement() {
    return this.counterService.decrement();
  }
}
