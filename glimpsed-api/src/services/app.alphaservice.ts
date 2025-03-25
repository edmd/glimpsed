import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AlphaService {
  private API_KEY = process.env.SECURITY_TOKEN;

  async getQuote(symbol: string): Promise<string> {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.API_KEY}`;

    console.log(url);

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSearch(keyword: string): Promise<string> {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${this.API_KEY}`;

    console.log(url);

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
