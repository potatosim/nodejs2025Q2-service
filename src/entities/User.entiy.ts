import { IUser } from 'src/repositories/User.repository';

export type IUserEntity = Omit<IUser, 'password'>;

export class UserEntity {
  public constructor(private readonly userData: IUser) {}

  public get(): IUserEntity {
    return {
      id: this.userData.id,
      login: this.userData.login,
      createdAt: this.userData.createdAt,
      updatedAt: this.userData.updatedAt,
      version: this.userData.version,
    };
  }
}
