/**
 * Session configuration.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */

export const sessionOptions = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'strict'
  }
}
