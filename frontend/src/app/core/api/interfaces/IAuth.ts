export interface IRequestlogin {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IResponseLogin {
  date: string;
  status: boolean;
  message: string;
  data: {
    email: string;
    token: string;
  };
}

export interface IRequestSignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
}

export interface IResponseSignUp {
  date: string;
  status: boolean;
  message: string;
  data: {
    id: number;
    email: string;
    avatar: string;
    createdAt: string;
  };
}

export interface IModalInfo {
  modalIcon: string;
  modalTitle: string;
  modalDescription: string;
  modalBtnCloseLabel: string;
  iconModalBackgroundColor: string;
  iconModalTextColor: string;
}
