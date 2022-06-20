import React, { useContext, useState } from 'react'
import { AccountContext } from './Account'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { authenticate } = useContext(AccountContext)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    authenticate(email, password)
      .then((user: any) => {
        alert(`Logged in with email: ${email} and password: ${password}`)
      })
      .catch((err: any) => {
        alert(err)
      })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}
