export interface LoginResponse {
    accessToken: string;
    username: string;
    email: string;
    id: number;
    roles: string[];
    tokenType: string;
  }
  