import { Injectable } from '@nestjs/common';

@Injectable()
export class CounterService {
  private counter = 0;

  getCounter() {
    return this.counter;
  }

  increment() {
    this.counter += 1;
    return this.counter;
  }

  decrement() {
    this.counter -= 1;
    return this.counter;
  }
}
