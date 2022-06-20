import React, { useEffect, useState } from 'react'
import UserPool from '@shared/auth/UserPool'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(`Signing up with email: ${email} and password: ${password}`)
    UserPool.signUp(email, password, [], [], (err, data) => {
      if (err) {
        alert(err)
      } else {
        alert(data)
      }
    })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}
