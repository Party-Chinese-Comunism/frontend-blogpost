/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as LoginIndexImport } from './routes/login/index'
import { Route as UserIdImport } from './routes/user.$id'
import { Route as AuthNewPostImport } from './routes/_auth.new-post'
import { Route as AuthMyPostsImport } from './routes/_auth.my-posts'
import { Route as AuthFavoritesImport } from './routes/_auth.favorites'
import { Route as AuthChatIndexImport } from './routes/_auth.chat/index'
import { Route as AuthChatChatIdImport } from './routes/_auth.chat/$chatId'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexRoute = LoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const UserIdRoute = UserIdImport.update({
  id: '/user/$id',
  path: '/user/$id',
  getParentRoute: () => rootRoute,
} as any)

const AuthNewPostRoute = AuthNewPostImport.update({
  id: '/new-post',
  path: '/new-post',
  getParentRoute: () => AuthRoute,
} as any)

const AuthMyPostsRoute = AuthMyPostsImport.update({
  id: '/my-posts',
  path: '/my-posts',
  getParentRoute: () => AuthRoute,
} as any)

const AuthFavoritesRoute = AuthFavoritesImport.update({
  id: '/favorites',
  path: '/favorites',
  getParentRoute: () => AuthRoute,
} as any)

const AuthChatIndexRoute = AuthChatIndexImport.update({
  id: '/chat/',
  path: '/chat/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthChatChatIdRoute = AuthChatChatIdImport.update({
  id: '/chat/$chatId',
  path: '/chat/$chatId',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/_auth/favorites': {
      id: '/_auth/favorites'
      path: '/favorites'
      fullPath: '/favorites'
      preLoaderRoute: typeof AuthFavoritesImport
      parentRoute: typeof AuthImport
    }
    '/_auth/my-posts': {
      id: '/_auth/my-posts'
      path: '/my-posts'
      fullPath: '/my-posts'
      preLoaderRoute: typeof AuthMyPostsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/new-post': {
      id: '/_auth/new-post'
      path: '/new-post'
      fullPath: '/new-post'
      preLoaderRoute: typeof AuthNewPostImport
      parentRoute: typeof AuthImport
    }
    '/user/$id': {
      id: '/user/$id'
      path: '/user/$id'
      fullPath: '/user/$id'
      preLoaderRoute: typeof UserIdImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth/chat/$chatId': {
      id: '/_auth/chat/$chatId'
      path: '/chat/$chatId'
      fullPath: '/chat/$chatId'
      preLoaderRoute: typeof AuthChatChatIdImport
      parentRoute: typeof AuthImport
    }
    '/_auth/chat/': {
      id: '/_auth/chat/'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof AuthChatIndexImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthFavoritesRoute: typeof AuthFavoritesRoute
  AuthMyPostsRoute: typeof AuthMyPostsRoute
  AuthNewPostRoute: typeof AuthNewPostRoute
  AuthChatChatIdRoute: typeof AuthChatChatIdRoute
  AuthChatIndexRoute: typeof AuthChatIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthFavoritesRoute: AuthFavoritesRoute,
  AuthMyPostsRoute: AuthMyPostsRoute,
  AuthNewPostRoute: AuthNewPostRoute,
  AuthChatChatIdRoute: AuthChatChatIdRoute,
  AuthChatIndexRoute: AuthChatIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/register': typeof RegisterRoute
  '/favorites': typeof AuthFavoritesRoute
  '/my-posts': typeof AuthMyPostsRoute
  '/new-post': typeof AuthNewPostRoute
  '/user/$id': typeof UserIdRoute
  '/login': typeof LoginIndexRoute
  '/chat/$chatId': typeof AuthChatChatIdRoute
  '/chat': typeof AuthChatIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/register': typeof RegisterRoute
  '/favorites': typeof AuthFavoritesRoute
  '/my-posts': typeof AuthMyPostsRoute
  '/new-post': typeof AuthNewPostRoute
  '/user/$id': typeof UserIdRoute
  '/login': typeof LoginIndexRoute
  '/chat/$chatId': typeof AuthChatChatIdRoute
  '/chat': typeof AuthChatIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/register': typeof RegisterRoute
  '/_auth/favorites': typeof AuthFavoritesRoute
  '/_auth/my-posts': typeof AuthMyPostsRoute
  '/_auth/new-post': typeof AuthNewPostRoute
  '/user/$id': typeof UserIdRoute
  '/login/': typeof LoginIndexRoute
  '/_auth/chat/$chatId': typeof AuthChatChatIdRoute
  '/_auth/chat/': typeof AuthChatIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/register'
    | '/favorites'
    | '/my-posts'
    | '/new-post'
    | '/user/$id'
    | '/login'
    | '/chat/$chatId'
    | '/chat'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/register'
    | '/favorites'
    | '/my-posts'
    | '/new-post'
    | '/user/$id'
    | '/login'
    | '/chat/$chatId'
    | '/chat'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/register'
    | '/_auth/favorites'
    | '/_auth/my-posts'
    | '/_auth/new-post'
    | '/user/$id'
    | '/login/'
    | '/_auth/chat/$chatId'
    | '/_auth/chat/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  RegisterRoute: typeof RegisterRoute
  UserIdRoute: typeof UserIdRoute
  LoginIndexRoute: typeof LoginIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  RegisterRoute: RegisterRoute,
  UserIdRoute: UserIdRoute,
  LoginIndexRoute: LoginIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/register",
        "/user/$id",
        "/login/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/favorites",
        "/_auth/my-posts",
        "/_auth/new-post",
        "/_auth/chat/$chatId",
        "/_auth/chat/"
      ]
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/_auth/favorites": {
      "filePath": "_auth.favorites.tsx",
      "parent": "/_auth"
    },
    "/_auth/my-posts": {
      "filePath": "_auth.my-posts.tsx",
      "parent": "/_auth"
    },
    "/_auth/new-post": {
      "filePath": "_auth.new-post.tsx",
      "parent": "/_auth"
    },
    "/user/$id": {
      "filePath": "user.$id.tsx"
    },
    "/login/": {
      "filePath": "login/index.tsx"
    },
    "/_auth/chat/$chatId": {
      "filePath": "_auth.chat/$chatId.tsx",
      "parent": "/_auth"
    },
    "/_auth/chat/": {
      "filePath": "_auth.chat/index.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
