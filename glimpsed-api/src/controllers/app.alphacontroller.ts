import { Controller, Get, Query } from '@nestjs/common';
import { AlphaService } from '../services/app.alphaservice';

@Controller('ticker')
export class AlphaController {
  constructor(private readonly alphaService: AlphaService) {}

  @Get()
  async getTicker(@Query('symbol') ticker: string): Promise<string> {
    return this.alphaService.getQuote(ticker);
  }
}

@Controller('search')
export class AlphaSearchController {
  constructor(private readonly alphaService: AlphaService) {}

  @Get()
  async getSearch(@Query('keyword') keyword: string): Promise<string> {
    return this.alphaService.getSearch(keyword);
  }
}
