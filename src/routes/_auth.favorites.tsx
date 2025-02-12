import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/favorites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/favorites"!</div>
}
