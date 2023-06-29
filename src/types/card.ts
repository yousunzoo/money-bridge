export interface IContentCard {
  id: number;
  title: string;
  pbName: string;
  companyLogo: string;
  career: number;
  tag1: string;
  tag2: string;
  msg: string;
  isBookmarked: boolean;
}

export interface IPbCard {
  id: number;
  profile: string;
  name: string;
  companyName: string;
  branchName: string;
  msg: string;
  speciality1: string;
  speciality2: string;
  career: number;
  reserveCount: number;
  reviewCount: number;
  isBookmarked: boolean;
  branchLat?: number;
  branchLon?: number;
}
