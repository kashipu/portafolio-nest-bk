import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { isEmail } from 'class-validator';

@Injectable()
export class EmailGuard implements CanActivate {
  static EMAIL_HEADER = 'Sec-4-Email';

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const email = request.get(EmailGuard.EMAIL_HEADER);
    if (!isEmail(email)) {
      throw new UnauthorizedException('Debe proveer un email válido en el header `Sec-4-Email`');
    }
    return true;
  }
}
