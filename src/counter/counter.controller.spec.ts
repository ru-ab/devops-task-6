import { Test, TestingModule } from '@nestjs/testing';
import { CounterController } from './counter.controller';
import { CounterService } from './counter.service';

describe('CounterController', () => {
  let controller: CounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CounterController],
      providers: [CounterService],
    }).compile();

    controller = module.get<CounterController>(CounterController);
  });

  it('should return counter value', () => {
    expect(controller.get()).toEqual(0);
  });

  it('should increment counter value', () => {
    expect(controller.increment()).toEqual(1);
  });

  it('should decrement counter value', () => {
    expect(controller.decrement()).toEqual(-1);
  });
});
