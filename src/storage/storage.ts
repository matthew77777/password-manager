import * as SecureStore from 'expo-secure-store';
import { PasswordItem } from '../types/password';

const PASSWORDS_KEY = 'password_items';

export async function getPasswords(): Promise<PasswordItem[]> {
  const raw = await SecureStore.getItemAsync(PASSWORDS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as PasswordItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function savePasswords(items: PasswordItem[]): Promise<void> {
  await SecureStore.setItemAsync(PASSWORDS_KEY, JSON.stringify(items));
}

export async function addPassword(item: PasswordItem): Promise<void> {
  const current = await getPasswords();
  await savePasswords([item, ...current]);
}

export async function updatePassword(item: PasswordItem): Promise<void> {
  const current = await getPasswords();
  const updated = current.map((existing) => (existing.id === item.id ? item : existing));
  await savePasswords(updated);
}

export async function deletePassword(id: string): Promise<void> {
  const current = await getPasswords();
  const filtered = current.filter((item) => item.id !== id);
  await savePasswords(filtered);
}
