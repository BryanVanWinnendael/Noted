import type { ThemeType } from "@lib/types";
import ThemeCard from "./ThemeCard";

const Themes = ({ themes }: { themes: { [key: string]: ThemeType } }) => {
  return (
    <div>
      {Object.keys(themes).map((theme: string, index) => {
        return <ThemeCard key={index} theme={themes[theme]} name={theme} />;
      })}
    </div>
  );
};

export default Themes;
