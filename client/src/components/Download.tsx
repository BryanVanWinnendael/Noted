import { useEffect, useMemo, useState } from "react";

const getOS = async () => {
  const res = await fetch("/api/os.json");
  return res.json();
};

const logDownload = async (type: "windows" | "linux" | "macos") => {
  await fetch("/api/downloads/" + type + ".json");
};

const Download = ({ nav }: { nav?: boolean }) => {
  const [os, setOS] = useState<"windows" | "linux" | "macos">("windows");

  const url = useMemo(() => {
    switch (os) {
      case "windows":
        return import.meta.env.PUBLIC_DOWNLOAD_URL_WIN;
      case "linux":
        return import.meta.env.PUBLIC_DOWNLOAD_URL_LIN;
      case "macos":
        return import.meta.env.PUBLIC_DOWNLOAD_URL_MAC;
    }
  }, [os]);

  useEffect(() => {
    const getUserOs = async () => {
      const res = await getOS();
      setOS(res.os);
    };
    getUserOs();
  }, []);

  const handleDownload = () => {
    logDownload(os);
    window.open(url);
  };

  return nav ? (
    <button
      onClick={handleDownload}
      className="hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer"
    >
      Download
    </button>
  ) : (
    <button
      onClick={handleDownload}
      className="bg-[#6488ea] hover:bg-[#5c7cd4] text-white p-2 rounded-lg"
    >
      Download for {os}
    </button>
  );
};

export default Download;
