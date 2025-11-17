export type AuthUser = {
   id: number;
   username: string;
   password: string;
   name?: string;
   country?: string;
   countryEmoji?: string;
};

export type AppUser = {
   id: number;
   username: string;
   name?: string;
   country?: string;
   countryEmoji?: string;
};
