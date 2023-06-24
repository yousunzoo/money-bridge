export interface IProfile {
  profile: string;
  msg: string;
  companyLogo: string;
}

export interface IloginProfile {
  id: number;
  profile: string;
  msg: string;
  name: string;
  isBookmarkeded: boolean;
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
  career: ICareer[];
  award: IAward[];
}

export interface ICareer {
  id: number;
  start: number;
  end: number;
  career: string;
}

export interface IAward {
  id: number;
  year: number;
  record: string;
}

export interface IPortfolio {
  pbId: number;
  cumulativeReturn: number;
  maxDrawdown: number;
  profitFactor: number;
  averageProfit: number;
  file: string;
}

export interface IPortfolioUpdate {
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

export interface ISamePB {
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

export interface IPbReview {
  reviewId: number;
  userName: string;
  content: string;
  createdAt: string;
  list: {
    style: string;
  }[];
}

export interface IReviewStyles {
  style1: string;
  style2: string;
  style3: string;
}
