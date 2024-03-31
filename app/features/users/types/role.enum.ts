export enum Role {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  REGULAR = 'REGULAR',
}
export const RoleValues = Object.values(Role).map((r) => r) as [
  string,
  ...string[],
];
