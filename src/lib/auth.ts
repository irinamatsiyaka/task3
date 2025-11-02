import type { AuthUser, AppUser } from "../types/user";

const USERS_KEY = "registeredUser";
const SESSION_KEY = "loggedInUser";

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
   name?: string
): AppUser {
   const users: AuthUser[] = readUsers();
   if (
      users.some(
         (existingUsers: AuthUser) => existingUsers.username === username
      )
   ) {
      throw new Error("this user name is already taken");
   }
   const newUser: AuthUser = {
      id: Date.now(),
      username,
      password,
      name,
   };
   writeUsers([...users, newUser]);
   const appUser: AppUser = {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
   };
   setCurrentUser(appUser);
   return appUser;
}

export function signIn(username: string, password: string): AppUser {
   const users: AuthUser = readUsers();
   const found = users.find(
      (existingUsers: AuthUser) =>
         existingUsers.username === username &&
         existingUsers.password === password
   );
   if (!found) throw new Error("Invalid username or password");
   const appUser: AppUser = {
      id: found.id,
      username: found.username,
      name: found.name,
   };
   setCurrentUser(appUser);
   return appUser;
}

export function signOut(): void {
   setCurrentUser(null);
}
