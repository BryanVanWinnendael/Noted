import { OutputData } from "@editorjs/editorjs";

export const CreatePublicNote = async (idToken: string, data: OutputData) => {
  const url = import.meta.env.VITE_SERVER_URL + "notes";
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(data),
  })
  .then((res) => res.json())
  .catch((error) => {
    console.error("Error creating public note:", error);
  })
}