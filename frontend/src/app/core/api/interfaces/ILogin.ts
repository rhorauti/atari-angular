export interface IRequestlogin {
    email: string;
    password: string;
    rememberMe: boolean;
  }
  
  export interface IResponseLogin {
    date: string;
    status: boolean;
    data: string;
  }