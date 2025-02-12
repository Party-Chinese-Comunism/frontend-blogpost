import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/new-post')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/new-post"!</div>
}
