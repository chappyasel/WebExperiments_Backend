import React, { createContext } from 'react'
import { CognitoUserSession, ISignUpResult, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { IAuthManager, AuthManager } from './index'

export const AuthContext = createContext<IAuthManager>(undefined!)

export function Auth(props: any) {
  const authManager = AuthManager.shared

  async function authenticate(email: string, password: string): Promise<CognitoUserSession> {
    return authManager.authenticate(email, password)
  }

  async function getSession(): Promise<CognitoUserSession> {
    return authManager.getSession()
  }

  async function getToken(): Promise<string> {
    return authManager.getToken()
  }

  async function getAttributes(): Promise<CognitoUserAttribute[]> {
    return authManager.getAttributes()
  }

  async function signUp(email: string, password: string): Promise<ISignUpResult> {
    return authManager.signUp(email, password)
  }

  async function logOut(): Promise<void> {
    return authManager.logOut()
  }

  return (
    <AuthContext.Provider
      value={{ authenticate, getSession, getToken, getAttributes, signUp, logOut }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
