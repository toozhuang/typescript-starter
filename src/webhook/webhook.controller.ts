import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { log } from 'util';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  /***
   * @param transfer
   */
  @Post('generate')
  async addATransfer(@Body('object_attributes') messageBody: any) {
    const { last_commit } = messageBody;

    this.webhookService.resendToWeChat(last_commit).subscribe((data) => {
      return data;
    });

    return { status: 'ok' };
  }
}
