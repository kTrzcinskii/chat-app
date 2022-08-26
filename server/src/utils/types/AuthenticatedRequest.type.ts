import { UserPayload } from './UserPayload.type';

export interface AuthenticatedRequest extends Request {
  user: UserPayload;
}
