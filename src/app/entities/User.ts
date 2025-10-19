export const UserRole = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  WAITER: 'WAITER',
  OWNER: 'OWNER',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cpf: string;
}
export const userHasTheRole = (user: User, role: UserRole): boolean => {
  return user.role === role
};