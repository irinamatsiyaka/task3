import type { AuthUser, AppUser } from "../types/user";

import {
   ERROR_USERNAME_TAKEN,
   ERROR_INVALID_CREDENTIALS,
} from "../constants/messages";

import { USERS_KEY, SESSION_KEY } from "../constants/storage";

export function readUsers(): AuthUser[] {
   try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as AuthUser[];
   } catch {
      return [];
   }
}

export function writeUsers(users: AuthUser[]): void {
   localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): AppUser | null {
   try {
      return JSON.parse(
         localStorage.getItem(SESSION_KEY) || "null"
      ) as AppUser | null;
   } catch {
      return null;
   }
}

export function setCurrentUser(user: AppUser | null): void {
   if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
   else localStorage.removeItem(SESSION_KEY);
}

export function createUser(
   username: string,
   password: string,
   name?: string,
   country?: string,
   countryEmoji?: string
): AppUser {
   const users: AuthUser[] = readUsers();
   if (
      users.some(
         (existingUsers: AuthUser) => existingUsers.username === username
      )
   ) {
      throw new Error(ERROR_USERNAME_TAKEN);
   }
   const newUser: AuthUser = {
      id: Date.now(),
      username,
      password,
      name,
      country,
      countryEmoji,
   };
   writeUsers([...users, newUser]);
   const appUser: AppUser = {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      country: newUser.country,
      countryEmoji: newUser.countryEmoji,
   };
   setCurrentUser(appUser);
   return appUser;
}

export function signIn(username: string, password: string): AppUser {
   const users: AuthUser[] = readUsers();
   const found = users.find(
      (existingUsers: AuthUser) =>
         existingUsers.username === username &&
         existingUsers.password === password
   );
   if (!found) throw new Error(ERROR_INVALID_CREDENTIALS);
   const appUser: AppUser = {
      id: found.id,
      username: found.username,
      name: found.name,
      country: found.country,
      countryEmoji: found.countryEmoji,
   };
   setCurrentUser(appUser);
   return appUser;
}

export function signOut(): void {
   setCurrentUser(null);
}
