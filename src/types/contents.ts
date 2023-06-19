export interface ContentsInfo {
  id: number;
  thumbnail: string;
  tag1: string;
  tag2: string | null;
  title: string;
  createdAt: string;
  pbId: number;
  name: string;
  profile: string;
  speciality1: string;
  speciality2: string | null;
  career: number;
  content: string;
  reply: Reply[];
}

export interface Reply {
  id: number;
  name: string;
  profile: string;
  replyContent: string;
  createdAt: string;
  parentId: number | null;
}

export interface ContentsSave {
  title: string;
  content: string;
  tag1: string;
  tag2: string;
  thumbnail: string;
}

export interface TempList {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Temp {
  title: string;
  content: string;
  tag1: string;
  tag2: string;
  thumbnail: string;
  status: string;
}

export interface TempSave {
  title: string;
  content: string;
  tag1: string;
  tag2: string;
  thumbnail: string;
}