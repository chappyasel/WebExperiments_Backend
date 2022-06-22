import { CognitoUserSession, ISignUpResult, CognitoUserAttribute } from 'amazon-cognito-identity-js'

export { AuthManager } from './AuthManager'
export { Auth, AuthContext } from './AuthContext'

export interface IAuthManager {
  authenticate(email: string, password: string): Promise<CognitoUserSession>
  getSession(): Promise<CognitoUserSession>
  getToken(): Promise<string>
  getAttributes(): Promise<CognitoUserAttribute[]>
  signUp(email: string, password: string): Promise<ISignUpResult>
  logOut(): Promise<void>
}
