export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  Id: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  currentPassword?: string; 
  token?: string;           
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  IsSaved: boolean;
  ErrorMessage?: string;
  Message?: string;
  SuccessMessage?: string;
  token?: string;
}
