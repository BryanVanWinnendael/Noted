export const GetUserNotes = async (): Promise<any | false> => {
  try {
    const token = localStorage.getItem("token") || "";
    const url = import.meta.env.VITE_SERVER_URL + "notes/user";
  
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  
    return await response.json();
  } catch (error) {
    return false;
  }
}