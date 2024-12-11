export const DeletePublicNote = async (id: string): Promise<any | false> => {
  try {
    const token = localStorage.getItem("token") || "";
    const url = import.meta.env.VITE_SERVER_URL + "notes/" + id;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return await response.json();
  } catch (error) {
    return false;
  }
};
