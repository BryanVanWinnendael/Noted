export const GetUserNotes = async () => {
  const token = localStorage.getItem("token") || "";
  const url = import.meta.env.VITE_SERVER_URL + "notes/user";
  
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
  .then((res) => res.json())
  .catch((error) => {
    console.error("Error creating public note:", error);
  })
}