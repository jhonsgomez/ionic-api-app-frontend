export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role?: number;
  confirmed?: boolean;
  photo?: {
    formats: {
      thumbnail: {
        url: string;
      };
    };
    url: string;
  };
}
