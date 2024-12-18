import { OutputData } from "@editorjs/editorjs";

export const CreatePublicNote = async (data: OutputData, path: string, style: any): Promise<any | false> => {
  try {
    const token = localStorage.getItem("token") || "";
    const url = import.meta.env.VITE_SERVER_URL + "notes";

    const response = await fetch(url, {
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
    });

    return await response.json();
  } catch (error) {
    return false;
  }
}