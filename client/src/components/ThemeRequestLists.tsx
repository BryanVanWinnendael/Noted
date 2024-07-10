import { useState } from "react";
import { type ThemeType } from "@lib/types";
import ThemeCard from "./ThemeCard";

const ThemeRequestList = ({
  themes,
}: {
  themes: { [key: string]: ThemeType };
}) => {
  const [resThemes, setResThemes] = useState(themes);

  const handleApprove = async (name: string, theme: ThemeType) => {
    const themeBody = {
      name: name,
      backgroundColor: theme.backgroundColor,
      secondaryBackgroundColor: theme.secondaryBackgroundColor,
      textColor: theme.textColor,
      iconColor: theme.iconColor,
      accentColor: theme.accentColor,
    };

    await fetch("/api/theme/request/add.json", {
      method: "POST",
      body: JSON.stringify(themeBody),
    });

    const newThemes = { ...resThemes };
    delete newThemes[name];
    setResThemes(newThemes);
  };

  const handleReject = async (name: string) => {
    await fetch("/api/theme/request/delete.json", {
      method: "POST",
      body: JSON.stringify(name),
    });

    const newThemes = { ...resThemes };
    delete newThemes[name];
    setResThemes(newThemes);
  };

  return (
    <div className="w-full">
      {resThemes &&
        Object.keys(resThemes).map((theme, index) => (
          <div key={index} className="bg-[#28282b] p-2 mb-5 rounded-md w-full">
            <ThemeCard theme={resThemes[theme]} name={theme} />
            <div className="m-3">
              <p className="text-2xl text-white">
                Requested by: {resThemes[theme].email}
              </p>
              <p className="text-2xl text-white">Theme: {theme}</p>
              <div className="flex mt-2">
                <button
                  onClick={() => handleApprove(theme, resThemes[theme])}
                  className="bg-green-500 p-2 rounded-md mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(theme)}
                  className="bg-red-500 p-2 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThemeRequestList;
