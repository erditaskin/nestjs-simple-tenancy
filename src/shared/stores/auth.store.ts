import { ClsStore } from 'nestjs-cls';
import { User } from '@/app/public/user/user.entity';

export interface AuthStore extends ClsStore {
  user: User;
}
