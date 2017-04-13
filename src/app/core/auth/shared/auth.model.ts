export class Auth {
  id: number;
  employeeId?: number;
  warehouseId?: number;
  userName: string;
  hasPassword?: boolean;
  hasPin?: boolean;
  displayName?: string;
  roleDescription: string;
  role: string;
  avatar?: string;
  title?: string;
  avatarIsUrl?: boolean;
}
