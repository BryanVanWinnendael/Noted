export const GetMarket = async (): Promise<any | false> => {
  try {
    const url = import.meta.env.VITE_SERVER_URL + "themes";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    return false;
  }
}