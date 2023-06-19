export interface Profile {
  profile: string;
  msg: string;
  companyLogo: string;
}

export interface loginProfile {
  id: number;
  profile: string;
  msg: string;
  name: string;
  isBookmarked: boolean;
  companyId: number;
  companyName: string;
  companyLogo: string;
  branchName: string;
  branchAddress: string;
  branchLatitude: number;
  branchLongitude: number;
  reserveCount: number;
  reviewCount: number;
  intro: string;
  speciality1: string;
  speciality2: string;
  career: Career[];
  award: Award[];
}

export interface Career {
  id: number;
  start: number;
  end: number;
  career: string;
}

export interface Award {
  id: number;
  year: number;
  record: string;
}

export interface Portfolio {
  pbId: number;
  cumulativeReturn: number;
  maxDrawdown: number;
  profitFactor: number;
  averageProfit: number;
  file: string;
}

export interface PortfolioUpdate {
  company: string;
  branchName: string;
  career: number;
  careers: {
    content: string;
    start: number;
    end: number;
  }[];
  awards: {
    record: string;
    year: number;
  }[];
  speciality1: string;
  speciality2: string;
  cumulativeReturn: number;
  maxDrawdown: number;
  profitFactor: number;
  averageProfit: number;
  file: string;
  intro: string;
  msg: string;
}

export interface SamePB {
  id: number;
  title: string;
  pbName: string;
  speciality1: string;
  speciality2: string;
  profile: string;
  address: string;
  reserveCount: number;
  reviewCount: number;
  career: number;
}

export interface PbReview {
  reviewId: number;
  userName: string;
  content: string;
  createdAt: string;
  list: {
    style: string;
  }[];
}

export interface ReviewStyles {
  style1: string;
  style2: string;
  style3: string;
}