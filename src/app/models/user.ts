export class SignUpUser {
    email: string;
    password: string;
  }
  
  export interface UserResult { 
    page: number ;
    per_page : number;
    total : number;
    total_pages: number;
    data: User[];
  }
  
  export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }
  
  export interface JwtResponse {
    userId: number;
    authorized: boolean;
    exp;
    userName: string;
    email: string;
  }
  
  export interface CurrentPerson {
    Name: string;
    Email: string;
    Id: number;
    Token: string;
  }