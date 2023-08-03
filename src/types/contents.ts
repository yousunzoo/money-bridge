export interface IContentsInfo {
  career: number;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  id: number;
  isBookmarked: boolean;
  name: string;
  pbId: number;
  profile: string;
  reply: IReply[];
  speciality1: string;
  speciality2: string;
  tag1: string;
  tag2: string;
  thumbnail: string;
  title: string;
  viewCount: number;
}
export interface INotLoginContentsInfo {
  thumbnail: string;
}
export interface IReply {
  authorId: number;
  content: string;
  createdAt: string;
  id: number;
  name: string;
  profile: string;
  reReply: IReReply[];
  role: string;
}

export interface IReReply {
  authorId: number;
  content: string;
  createdAt: string;
  id: number;
  name: string;
  profile: string;
  role: string;
  uniqueValue: number;
}

export interface IContentsSave {
  title?: string;
  content?: string;
  tag1?: string;
  tag2?: string;
}
export interface IContentsEdit {
  title?: string;
  content?: string;
  tag1?: string;
  tag2?: string;
  deleteThumbnail?: boolean;
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

export interface IContentData {
  id: number;
  thumbnail: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  tag1: string;
  tag2: string;
  pbId: number;
  name: string;
  isBookmarked: boolean;
  profile: string;
  viewCount: number;
}
