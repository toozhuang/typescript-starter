import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WebhookService {
  constructor(private httpService: HttpService) {}

  resendToWeChat(last_commit: any): Observable<any> {
    const wechat_webhook =
      'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=c0370b72-eb11-4807-81f1-f827362001bf';
    // 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9eb501c6-5498-4cad-8f25-7f0fa9db9455'; // node 服务端

    const message = {
      msgtype: 'markdown',
      markdown: {
        content: `### Merge request: \n**description**: ${last_commit.message}**url**: ${last_commit.url}`,
      },
    };

    return this.httpService.post(wechat_webhook, JSON.stringify(message), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
