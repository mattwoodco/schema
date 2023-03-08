import { LoginForm } from './LoginForm'

export default function Login() {
  return (
    <div className="grid grid-cols-2 w-full h-full items-center">
      <LoginForm callbackUrl="/" className="col-start-2" />
    </div>
  )
}
