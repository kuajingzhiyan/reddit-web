let googleScriptPromise: Promise<void> | null = null
let hiddenButtonHost: HTMLDivElement | null = null
let preparedClientId: string | null = null
let onCredentialReceived: ((credential: string) => void | Promise<void>) | null = null

function loadGoogleScript(): Promise<void> {
  if (import.meta.server) {
    return Promise.reject(new Error('Google Sign-In is client-only'))
  }

  if (window.google?.accounts?.id) {
    return Promise.resolve()
  }

  if (!googleScriptPromise) {
    googleScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Google Sign-In'))
      document.head.appendChild(script)
    })
  }

  return googleScriptPromise
}

function ensureHiddenHost(): HTMLDivElement {
  if (!hiddenButtonHost) {
    hiddenButtonHost = document.createElement('div')
    hiddenButtonHost.setAttribute('aria-hidden', 'true')
    hiddenButtonHost.style.cssText = 'position:fixed;left:-9999px;top:0;width:280px;height:44px;overflow:hidden;opacity:0;pointer-events:none;'
    document.body.appendChild(hiddenButtonHost)
  }
  return hiddenButtonHost
}

async function waitForGoogleButton(host: HTMLElement, timeoutMs = 4000): Promise<HTMLElement> {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    const button = host.querySelector('[role="button"]') as HTMLElement | null
    if (button)
      return button
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  throw new Error('Google sign-in button failed to initialize')
}

export function useGoogleAuth() {
  const config = useRuntimeConfig()
  const clientId = computed(() => (config.public.googleClientId as string)?.trim() || '')

  const isEnabled = computed(() => Boolean(clientId.value))

  async function prepareSignIn(
    onCredential: (credential: string) => void | Promise<void>,
    locale?: string,
  ) {
    if (!clientId.value) {
      throw new Error('GOOGLE_CLIENT_ID_NOT_CONFIGURED')
    }

    await loadGoogleScript()
    onCredentialReceived = onCredential

    const host = ensureHiddenHost()
    if (preparedClientId !== clientId.value) {
      host.replaceChildren()
      window.google!.accounts.id.initialize({
        client_id: clientId.value,
        callback: (response) => {
          void onCredentialReceived?.(response.credential)
        },
        ux_mode: 'popup',
      })
      window.google!.accounts.id.renderButton(host, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        width: 280,
        locale,
      })
      preparedClientId = clientId.value
    }
  }

  async function openSignIn(
    onCredential: (credential: string) => void | Promise<void>,
    locale?: string,
  ) {
    await prepareSignIn(onCredential, locale)
    const host = ensureHiddenHost()
    const button = await waitForGoogleButton(host)
    button.click()
  }

  return {
    isEnabled,
    openSignIn,
  }
}
