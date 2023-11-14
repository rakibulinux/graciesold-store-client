export enum UserRole {
  "admin",
  "customer",
}
export interface UserProfile {
  id?: string;
  username?: string;
  userId?: string;
  bio?: string;
  profileImg?: string;
  phoneNo?: string;
  address?: string;
  gender?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUser = {
  data: {
    id: string;
    email: string;
    name: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    profile: UserProfile;
    updatedAt: Date;
    isEmailVerified: boolean;
    hash?: string;
  };
};
