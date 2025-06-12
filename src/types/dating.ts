export interface Profile {
  id: string;
  photo: string;
  name: string;
  age: number;
  city: string;
  height: string;
  weight: string;
  lookingFor: string;
  about: string;
  userId: string;
}

export interface User {
  id: string;
  login: string;
  email: string;
}

export interface Like {
  id: string;
  fromUserId: string;
  toProfileId: string;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  chatType: string;
  timestamp: Date;
}
