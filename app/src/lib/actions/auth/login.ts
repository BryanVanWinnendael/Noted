export const Login = async (idToken: string): Promise<any | false> => {
  try {
    const url = import.meta.env.VITE_CLIENT_URL + "api/auth/login.session.json";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });
    return await response.json();
  } catch (error) {
    return false;
  }
}