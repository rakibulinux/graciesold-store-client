export type Profile = {
  id: string;
  username: string;
  userId: string;
  bio: string | null;
  profileImg: string | null;
  phoneNo: string | null;
  address: string | null;
  gender: string | null;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    profile: Profile;
    isEmailVerified: false;
  };
};
