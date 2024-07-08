import { auth } from "@lib/firebase/server"

export const getUser = async (cookie: string) => {
  try {
    const decodedIdToken = await auth.verifySessionCookie(cookie, true)
    const user = await auth.getUser(decodedIdToken.uid)
    return user
  } catch (error) {
    return null
  }
}

export const fetcher = async (
  url: string,
  method: string,
  cookie: string,
  body: any = null,
) => {
  console.log(cookie)
  const API_URL = import.meta.env.PUBLIC_API_URL + url
  if (method === "GET") {
    return fetch(API_URL, {
      method: method,
      headers: {
        Authorization: cookie,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json()
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " +
            error.message,
        )
        throw error
      })
  } else {
    return fetch(API_URL, {
      method: method,
      headers: {
        Authorization: cookie,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body) || null,
    })
      .then(function (response) {
        return response.json()
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " +
            error.message,
        )
        throw error
      })
  }
}

export const admins = import.meta.env.FIREBASE_ADMIN_EMAILS
