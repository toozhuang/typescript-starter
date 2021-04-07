import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class AutoIdGenerateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const generatedId = uuidv1();

    req.body.transfer.mi_id = generatedId;
    next();
  }
}
