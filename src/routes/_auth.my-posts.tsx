import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/my-posts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/my-posts"!</div>
}
