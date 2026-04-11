import type { Request, Response } from 'express'

import { noCacheControl } from './cache-control'

export default function reqHeaders(req: Request, res: Response) {
  // Only expose request headers in development to prevent leaking
  // sensitive information (cookies, auth tokens, internal proxy headers)
  // in production or staging environments.
  if (process.env.NODE_ENV !== 'development') {
    res.status(404).json({ error: 'Not found' })
    return
  }
  noCacheControl(res)
  res.json({
    'request-headers': req.headers,
  })
}
