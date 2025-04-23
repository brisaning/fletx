import { Expose } from 'class-transformer';

export class AuthResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    position: string;
    companyId?: number;
  };
}