import React, { createContext } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import UserPool from '@shared/auth/UserPool'

const start: any = {}
const AccountContext = createContext(start)

function Account(props: any) {
  async function getSession() {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser()
      if (user) {
        user.getSession((err: any, session: any) => {
          if (err) {
            reject(err)
          }
          resolve(session)
        })
      } else {
        reject()
      }
    })
  }

  async function getAttributes() {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser()
      user?.getUserAttributes((err: any, attributes: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(attributes)
        }
      })
    })
  }

  async function authenticate(email: string, password: string) {
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

  function logOut() {
    const user = UserPool.getCurrentUser()
    if (user) {
      user.signOut()
    }
  }

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logOut }}>
      {props.children}
    </AccountContext.Provider>
  )
}

export { AccountContext, Account }
