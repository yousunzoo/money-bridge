export interface IContentsInfo {
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
  reply: IReply[];
}

export interface IReply {
  id: number;
  name: string;
  profile: string;
  replyContent: string;
  createdAt: string;
  parentId: number | null;
}

export interface IContentsSave {
  title: string;
  content: string;
  tag1: string;
  tag2: string;
  thumbnail: string;
}

export interface ITempList {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface ITemp {
  title: string;
  content: string;
  tag1: string;
  tag2: string;
  thumbnail: string;
  status: string;
}

export interface ITempSave {
  title: string;
  content: string;
  tag1: string;
  tag2: string;
  thumbnail: string;
}