import React, { useEffect, useState } from "react";

const Download = ({ nav }: { nav?: boolean }) => {
  const [os, setOS] = useState<"windows" | "linux">("windows");
  const url =
    os === "windows"
      ? import.meta.env.PUBLIC_DOWNLOAD_URL_WIN
      : import.meta.env.PUBLIC_DOWNLOAD_URL_LIN;

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Win") !== -1) {
      setOS("windows");
    } else if (userAgent.indexOf("Linux") !== -1) {
      setOS("linux");
    }
  }, []);

  const handleDownload = () => {
    console.log("Download clicked");
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
      Download for free
    </button>
  );
};

export default Download;
