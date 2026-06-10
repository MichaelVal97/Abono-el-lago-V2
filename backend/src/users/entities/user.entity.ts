export type UserEntity = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
