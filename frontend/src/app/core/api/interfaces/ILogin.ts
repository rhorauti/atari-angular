export interface IRequestlogin {
    email: string;
    password: string;
    isChecked: boolean;
  }
  
  export interface IResponseLogin {
    date: string;
    status: boolean;
    data: string;
  }