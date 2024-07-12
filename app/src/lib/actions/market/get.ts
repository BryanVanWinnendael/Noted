export const GetMarket = async () => {
  const url = import.meta.env.VITE_SERVER_URL + "themes";
  
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .catch((error) => {
    console.error("Error creating public note:", error);
  })
}