import AppFooter from '@/components/AppFooter'
import { LoginForm } from './LoginForm'

export default function Login() {
  return (
    <div className="flex flex-col h-full">
      <div className="grid lg:grid-cols-2 w-full h-full items-center">
        <LoginForm callbackUrl="/" className="px-12 lg:px-0 lg:col-start-2" />
      </div>
      <div className="flex-1 mt-auto">
        <AppFooter />
      </div>
    </div>
  )
}
