import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  ISignUpResult,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js'
import UserPool from '@shared/auth/UserPool'
import { IAuthManager } from './index'

export class AuthManager implements IAuthManager {
  static shared = new AuthManager()

  async authenticate(email: string, password: string): Promise<CognitoUserSession> {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      })

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      })

      user.authenticateUser(authDetails, {
        onSuccess: resolve,
        onFailure: reject,
        newPasswordRequired: resolve,
      })
    })
  }

  async getSession(): Promise<CognitoUserSession> {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser()
      if (user == null) {
        reject()
        return
      }
      user.getSession((err: Error | null, session: CognitoUserSession) => {
        if (err) {
          reject(err)
          return
        }
        resolve(session)
      })
    })
  }

  async getToken(): Promise<string> {
    return await new Promise((resolve, reject) => {
      this.getSession()
        .then(session => session.getIdToken())
        .then(token => resolve(token.getJwtToken()))
        .catch(err => reject(err))
    })
  }

  async getAttributes(): Promise<CognitoUserAttribute[]> {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser()
      if (user == null) {
        reject()
        return
      }
      user.getUserAttributes((err: any, attrs: CognitoUserAttribute[] | undefined) => {
        if (err || attrs == null) {
          reject(err)
          return
        }
        resolve(attrs)
      })
    })
  }

  async signUp(email: string, password: string): Promise<ISignUpResult> {
    return await new Promise((resolve, reject) => {
      UserPool.signUp(email, password, [], [], (err: any, result: ISignUpResult | undefined) => {
        if (err || result == null) {
          reject(err)
          return
        }
        resolve(result)
      })
    })
  }

  async logOut(): Promise<void> {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser()
      if (user == null) {
        reject()
        return
      }
      user.signOut(() => {
        resolve()
      })
    })
  }
}
