import { hashSync, compareSync } from "bcrypt";

export function hashSecret(secret: string): string {
  return hashSync(secret, 10);
}

export function compareSecret(secret: string, hash: string): boolean {
  return compareSync(secret, hash);
}
