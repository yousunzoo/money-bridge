export interface IResponseLogin {
  headers: {
    authorization: string;
  };
  data: IResponseLoginData;
}

interface IResponseLoginData {
  status: number;
  msg: string;
  data: {
    id: number;
    code: string | null;
  };
}
export interface IUser {
  role: string;
  email?: string;
  name?: string;
  password?: string;
  phoneNumber?: string;
}
