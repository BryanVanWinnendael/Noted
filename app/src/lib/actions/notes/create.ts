import { OutputData } from "@editorjs/editorjs";

export const CreatePublicNote = async (data: OutputData, path: string, style: any) => {
  const token = localStorage.getItem("token") || "";
  const url = import.meta.env.VITE_SERVER_URL + "notes";
  
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      data: JSON.stringify(data),
      path,
      style: JSON.stringify(style),
    }),
  })
  .then((res) => res.json())
  .catch((error) => {
    console.error("Error creating public note:", error);
  })
}