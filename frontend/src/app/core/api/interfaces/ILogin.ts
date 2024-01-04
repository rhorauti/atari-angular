export interface IRequestlogin {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IResponseLogin {
  date: string;
  status: boolean;
  message: string;
  data: Object;
}

export interface IModalInfo {
  modalIcon: string;
  modalTitle: string;
  modalDescription: string;
  iconModalBackgroundColor: string;
  iconModalTextColor: string;
}
