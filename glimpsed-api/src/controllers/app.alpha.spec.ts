import { Test, TestingModule } from '@nestjs/testing';
import { AlphaController } from './app.alphacontroller';
import { AlphaService } from '../services/app.alphaservice';

describe('AlphaController', () => {
  let appController: AlphaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AlphaController],
      providers: [AlphaService],
    }).compile();

    appController = app.get<AlphaController>(AlphaController);
  });

  describe('root', () => {
    it('should return a value', () => {
      expect(appController.getTicker('IBM')).toBeCalled();
    });
  });
});
