import { TenantContext } from '../tenant/tenant-context';
import { JwtPayload } from '../../modules/auth/auth.types';

declare global {
  namespace Express {
    interface Request {
      tenant?: TenantContext;
      user?: JwtPayload;
    }
  }
}

export {};
