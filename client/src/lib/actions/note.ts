export const getNote = (id: string | undefined) => {
  if (!id) return;
  const url = import.meta.env.PUBLIC_API_URL + "notes/" + id;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error getting note:", error);
    });
};
