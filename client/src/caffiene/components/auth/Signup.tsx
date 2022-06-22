import React, { useContext, useState } from 'react'
import { AuthContext } from '../../auth'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const account = useContext(AuthContext)

  async function onSubmit(e: any) {
    e.preventDefault()
    try {
      await account.signUp(email, password)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
