export const DeletePublicNote = async (id: string) => {
  const token = localStorage.getItem("token") || "";
  const url = import.meta.env.VITE_SERVER_URL + "notes/" + id;

  return await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error creating public note:", error);
    });
};
