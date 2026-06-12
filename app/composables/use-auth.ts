import type { ApiResponse } from '~/utils/api'

export interface AuthUser {
  id: number
  email: string
  name: string | null
}

interface LoginData {
  token: string
  user: AuthUser
}

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_USER_KEY = 'auth_user'

export function useAuth() {
  const token = useCookie<string | null>(AUTH_TOKEN_KEY, {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7,
  })

  const user = useCookie<AuthUser | null>(AUTH_USER_KEY, {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7,
  })

  const isLoggedIn = computed(() => Boolean(token.value && user.value))

  function persistSession(data: LoginData) {
    token.value = data.token
    user.value = data.user
  }

  async function login(email: string, password: string, _remember = true) {
    const response = await $fetch<ApiResponse<LoginData>>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })

    persistSession(response.data)
    return response.data.user
  }

  async function loginWithGoogle(credential: string) {
    const response = await $fetch<ApiResponse<LoginData>>('/api/auth/google', {
      method: 'POST',
      body: { credential },
    })

    persistSession(response.data)
    return response.data.user
  }

  async function register(
    email: string,
    password: string,
    name?: string,
  ) {
    const response = await $fetch<ApiResponse<LoginData>>('/api/auth/register', {
      method: 'POST',
      body: { email, password, ...(name ? { name } : {}) },
    })

    persistSession(response.data)
    return response.data.user
  }

  async function logout() {
    token.value = null
    user.value = null
  }

  async function fetchMe() {
    if (!token.value)
      return null

    try {
      const response = await $fetch<ApiResponse<AuthUser>>('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      user.value = response.data
      return response.data
    }
    catch {
      token.value = null
      user.value = null
      return null
    }
  }

  return {
    isLoggedIn,
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    fetchMe,
  }
}
