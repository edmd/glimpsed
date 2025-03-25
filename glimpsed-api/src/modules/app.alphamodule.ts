import { Module } from '@nestjs/common';
import {
  AlphaController,
  AlphaSearchController,
} from '../controllers/app.alphacontroller';
import { AlphaService } from '../services/app.alphaservice';

@Module({
  imports: [],
  controllers: [AlphaController, AlphaSearchController],
  providers: [AlphaService],
})
export class AlphaModule {}
