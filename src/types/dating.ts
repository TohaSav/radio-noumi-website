export interface User {
  id: string;
  login: string;
  email: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  age: number;
  city: string;
  height: string;
  weight: string;
  lookingFor: string;
  about: string;
  photo: string;
  gender: "male" | "female";
}

export interface Message {
  id: string;
  text: string;
  userName: string;
  timestamp: Date;
  chatType: "general" | "private";
  userId?: string;
}

export interface Like {
  id: string;
  fromUserId: string;
  toProfileId: string;
  timestamp: Date;
}
