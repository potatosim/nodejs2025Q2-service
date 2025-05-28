export interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface IUpdateUserDto {
  oldPassword: string;
  newPassword: string;
}
