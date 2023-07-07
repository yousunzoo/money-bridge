export interface IResponseLogin {
  config: IResponseLoginConfig;
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

interface IResponseLoginConfig {
  data: string;
}

export interface IUser {
  role: string | undefined;
  id?: number;
  email?: string;
  name?: string;
  password?: string;
  phoneNumber?: string;
}

export interface IUserLogin {
  role: string;
  email: string;
  password: string;
  remember: boolean;
}

export interface IFindEmail {
  status: number;
  msg: string;
  data: IFindEmailData[];
}

export interface IFindEmailData {
  email: string;
  name: string;
  phoneNumber: string;
}

export interface IFindPassword {
  status: number;
  msg: string;
  data: {
    id: number;
    role: string;
    name: string;
    phoneNumber: string;
    email: string;
    code: string;
  };
}

export interface IResponseErrorData400 {
  data: {
    key: string;
    value: string;
  };
  msg: string;
  status: number;
}

export interface IResponseErrorData404 {
  data: string;
  msg: string;
  status: number;
}
