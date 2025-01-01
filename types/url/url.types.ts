import { User } from "../user/user.types";

export interface Url {
  id: number;
  originalUrl: string;
  shortCode: string;
  customAlias: string | null;
  expirationDate: string;
  clickCount: number;
  password: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  user: User;
  qrCode: string | null;
}
