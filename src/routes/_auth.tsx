import * as React from 'react'
import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
} from '@tanstack/react-router'
import { useAuth } from '../context/auth'


export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="p-2 h-full">
      <Outlet />
    </div>
  )
}
