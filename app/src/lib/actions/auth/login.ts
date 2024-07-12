export const Login = async (idToken: string) => {
  const url = import.meta.env.VITE_CLIENT_URL + "api/auth/login.session.json";
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  })
  .then((res) => res.json())
  .catch((error) => {
    console.error("Error creating public note:", error);
  })
}