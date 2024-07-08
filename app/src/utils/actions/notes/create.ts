import { OutputData } from "@editorjs/editorjs";

export const CreatePublicNote = async (data: OutputData) => {
  const token = localStorage.getItem("token") || "";
  const url = import.meta.env.VITE_SERVER_URL + "notes";
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  })
  .then((res) => res.json())
  .catch((error) => {
    console.error("Error creating public note:", error);
  })
}