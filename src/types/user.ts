export type AuthUser = {
   id: number;
   username: string;
   password: string;
   name?: string;
};

export type AppUser = {
   id: string;
   username: string;
   name?: string;
};
