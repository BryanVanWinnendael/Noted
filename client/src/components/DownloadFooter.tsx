import React, { useEffect, useState } from "react";

const DownloadFooter = () => {
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

  return (
    <section className="w-full h-full flex justify-center mt-12">
      <div className="bg-[#f6f5f4] h-full lg:w-3/4 w-full rounded-xl p-4">
        <h2 className="scroll-m-2 text-3xl font-semibold tracking-tight first:mt-0">
          And more...
        </h2>
        <p className="leading-7 w-1/2">
          <a href={url} className="text-[#6488ea]">
            Download Noted
          </a>{" "}
          or visit the{" "}
          <a href="/docs" target="_blank" className="text-[#6488ea]">
            docs
          </a>{" "}
          to view all features
        </p>
      </div>
    </section>
  );
};

export default DownloadFooter;
