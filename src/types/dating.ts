export interface Profile {
  id: string;
  photo: string;
  name: string;
  age: number;
  city: string;
  height: number;
  weight: number;
  lookingFor: string;
  about: string;
  timestamp: Date;
}

export interface User {
  login: string;
  email: string;
  password: string;
}

export interface Like {
  id: string;
  profileId: string;
  likerName: string;
  timestamp: Date;
}

export interface Message {
  id: string;
  from: string;
  to?: string;
  content: string;
  timestamp: Date;
  type: "public" | "private";
}
