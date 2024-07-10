import type { ThemeType } from "@lib/types";
import { useState } from "react";

const ThemeCard = ({ theme, name }: { theme: ThemeType; name: string }) => {
  const [toolTipText, setToolTipText] = useState<string>("Copy to clipboard");
  const orderOfKeys: string[] = [
    "backgroundColor",
    "secondaryBackgroundColor",
    "textColor",
    "iconColor",
    "accentColor",
  ];

  const reorderedObject: any = {};
  orderOfKeys.forEach((key: string) => {
    reorderedObject[key] = theme[key];
  });

  const handleCopyToClipboard = () => {
    setToolTipText("Copied!");
    const copyTheme = `{
      "backgroundColor": "${theme.backgroundColor}",
      "secondaryBackgroundColor": "${theme.secondaryBackgroundColor}",
      "textColor": "${theme.textColor}",
      "iconColor": "${theme.iconColor}",
      "accentColor": "${theme.accentColor}"
    }`;
    navigator.clipboard.writeText(copyTheme);
  };

  const handleLeave = () => {
    setToolTipText("Copy to clipboard");
  };

  return (
    <div>
      <div
        id={name}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div
            style={{
              backgroundColor: theme.backgroundColor,
              borderColor: theme.secondaryBackgroundColor,
            }}
            className="relative pb-4 rounded-lg shadow border-[1px]"
          >
            <div className="flex items-center justify-between pt-4 pr-4 rounded-t ">
              <button
                style={{ color: theme.iconColor }}
                type="button"
                className="hover:bg- bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide={name}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="px-4 space-y-4">
              <h1
                style={{ color: theme.textColor }}
                className="text-4xl font-semibold"
              >
                Preview of {name}
              </h1>
              <p
                style={{ color: theme.textColor }}
                className="text-base leading-relaxed"
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
                quae sequi praesentium optio perspiciatis earum aliquid, aliquam
                minima, ab consequatur quia libero est natus alias voluptatibus
                in perferendis eaque quas.
              </p>
              <p
                style={{ color: theme.textColor }}
                className="text-base leading-relaxed"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                sunt? Tempore at deleniti facere esse, officiis veritatis iusto
                dolorem, doloremque dolores in, maxime fuga incidunt impedit
                dicta architecto blanditiis eius?
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                <p
                  style={{
                    color: theme.textColor,
                    backgroundColor: theme.backgroundColor,
                    borderColor: theme.accentColor,
                  }}
                  className="text-base leading-relaxed border-[1px] w-fit rounded-md p-1"
                >
                  Background color: {theme.backgroundColor}
                </p>
                <p
                  style={{
                    color: theme.textColor,
                    backgroundColor: theme.secondaryBackgroundColor,
                    borderColor: theme.accentColor,
                  }}
                  className="text-base leading-relaxed border-[1px] w-fit rounded-md p-1"
                >
                  Secondary background color: {theme.secondaryBackgroundColor}
                </p>
                <p
                  style={{
                    color: theme.backgroundColor,
                    backgroundColor: theme.textColor,
                    borderColor: theme.accentColor,
                  }}
                  className="text-base leading-relaxed border-[1px] w-fit rounded-md p-1"
                >
                  Text color: {theme.textColor}
                </p>
                <p
                  style={{
                    color: theme.backgroundColor,
                    backgroundColor: theme.iconColor,
                    borderColor: theme.accentColor,
                  }}
                  className="text-base leading-relaxed border-[1px] w-fit rounded-md p-1"
                >
                  Icon color: {theme.iconColor}
                </p>
                <p
                  style={{
                    color: theme.textColor,
                    backgroundColor: theme.accentColor,
                    borderColor: theme.accentColor,
                  }}
                  className="text-base leading-relaxed border-[1px] w-fit rounded-md p-1"
                >
                  Accent color: {theme.accentColor}
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: theme.secondaryBackgroundColor,
              }}
              className="flex items-center m-4 rounded-md p-3"
            >
              <div className="tooltip">
                <button
                  onMouseLeave={handleLeave}
                  onClick={handleCopyToClipboard}
                  style={{
                    backgroundColor: theme.accentColor,
                    color: theme.textColor,
                  }}
                  type="button"
                  className="text-white hover:opacity-90 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <span className="tooltiptext" id="myTooltip">
                    {toolTipText}
                  </span>
                  Copy theme
                </button>
              </div>

              <button
                style={{
                  borderColor: theme.accentColor,
                  color: theme.textColor,
                }}
                data-modal-hide={name}
                type="button"
                className="ms-3 hover:opacity-90 rounded-lg border text-sm font-medium px-5 py-2.5"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        data-modal-target={name}
        data-modal-toggle={name}
        style={{ backgroundColor: theme.backgroundColor }}
        className="flex flex-col w-full h-64 px-7 py-4 rounded-md border-[1px] border-gray-100 border-opacity-10 mb-5"
      >
        <div
          style={{
            backgroundColor: theme.secondaryBackgroundColor,
          }}
          className="rounded-md p-4 h-full w-full flex items-center justify-between"
        >
          <p className="text-5xl" style={{ color: theme.textColor }}>
            {name}
          </p>
        </div>
        <div className="grid gap-6 grid-cols-3 mt-5 w-full">
          {Object.keys(reorderedObject).map((key: string) => {
            return (
              <div
                style={{
                  border: "1px solid",
                  borderColor: theme.accentColor,
                  backgroundColor: theme[key as keyof ThemeType],
                }}
                className="rounded-md h-9 w-9"
              />
            );
          })}
        </div>
      </button>
    </div>
  );
};

export default ThemeCard;
