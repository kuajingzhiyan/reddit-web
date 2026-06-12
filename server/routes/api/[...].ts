import { defineEventHandler, getRequestURL, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const url = getRequestURL(event)
  const target = `${config.apiProxyTarget}${url.pathname}${url.search}`

  return proxyRequest(event, target)
})
