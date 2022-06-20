import React, { useContext, useState } from 'react'
import { AccountContext } from './Account'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const account = useContext(AccountContext)

  async function onSubmit(e: any) {
    e.preventDefault()

    try {
      await account.authenticate(email, password)
      alert(`Logged in with email: ${email}`)
    } catch (err) {
      alert(err)
    }
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
