import React, { createContext } from 'react'
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  ISignUpResult,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js'
import UserPool from '@shared/auth/UserPool'

interface IAccountContext {
  authenticate: (email: string, password: string) => Promise<CognitoUserSession>
  getSession: () => Promise<CognitoUserSession>
  getAttributes: () => Promise<CognitoUserAttribute[]>
  signUp: (email: string, password: string) => Promise<ISignUpResult>
  logOut: () => Promise<void>
}

const AccountContext = createContext<IAccountContext>(undefined!)

function Account(props: any) {
  async function authenticate(email: string, password: string): Promise<CognitoUserSession> {
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

  async function getSession(): Promise<CognitoUserSession> {
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

  async function getAttributes(): Promise<CognitoUserAttribute[]> {
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

  async function signUp(email: string, password: string): Promise<ISignUpResult> {
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

  async function logOut(): Promise<void> {
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

  return (
    <AccountContext.Provider value={{ authenticate, getSession, getAttributes, signUp, logOut }}>
      {props.children}
    </AccountContext.Provider>
  )
}

export { AccountContext, Account }
