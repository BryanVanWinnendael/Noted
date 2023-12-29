import type { ThemeType } from "@lib/types"
import { For, createSignal } from "solid-js"

const ThemeCard = ({ theme, name }: { theme: ThemeType; name: string }) => {
  const [toolTipText, setToolTipText] =
    createSignal<string>("Copy to clipboard")
  const orderOfKeys: string[] = [
    "backgroundColor",
    "secondaryBackgroundColor",
    "textColor",
    "iconColor",
    "accentColor",
  ]

  const reorderedObject: any = {}
  orderOfKeys.forEach((key: string) => {
    reorderedObject[key] = theme[key]
  })

  const handleCopyToClipboard = () => {
    setToolTipText("Copied!")
    const copyTheme = `{
      "backgroundColor": "${theme.backgroundColor}",
      "secondaryBackgroundColor": "${theme.secondaryBackgroundColor}",
      "textColor": "${theme.textColor}",
      "iconColor": "${theme.iconColor}",
      "accentColor": "${theme.accentColor}"
    }`
    navigator.clipboard.writeText(copyTheme)
  }

  const handleLeave = () => {
    setToolTipText("Copy to clipboard")
  }

  return (
    <div>
      <div
        id={name}
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div
            style={{
              "background-color": theme.backgroundColor,
              "border-color": theme.secondaryBackgroundColor,
            }}
            class="relative pb-4 rounded-lg shadow border-[1px]"
          >
            <div class="flex items-center justify-between pt-4 pr-4 rounded-t ">
              <button
                style={{ color: theme.iconColor }}
                type="button"
                class="hover:bg- bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide={name}
              >
                <svg
                  class="w-3 h-3"
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
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="px-4 space-y-4">
              <h1
                style={{ color: theme.textColor }}
                class="text-4xl font-semibold"
              >
                Preview of {name}
              </h1>
              <p
                style={{ color: theme.textColor }}
                class="text-base leading-relaxed"
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
                quae sequi praesentium optio perspiciatis earum aliquid, aliquam
                minima, ab consequatur quia libero est natus alias voluptatibus
                in perferendis eaque quas.
              </p>
              <p
                style={{ color: theme.textColor }}
                class="text-base leading-relaxed"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                sunt? Tempore at deleniti facere esse, officiis veritatis iusto
                dolorem, doloremque dolores in, maxime fuga incidunt impedit
                dicta architecto blanditiis eius?
              </p>
              <div class="grid sm:grid-cols-2 gap-2">
                <p
                  style={{
                    color: theme.textColor,
                    "background-color": theme.backgroundColor,
                    "border-color": theme.accentColor,
                  }}
                  class="text-base leading-relaxed border-[1px] w-fit rounded-md p-1"
                >
                  Background color: {theme.backgroundColor}
                </p>
                <p
                  style={{
                    color: theme.textColor,
                    "background-color": theme.secondaryBackgroundColor,
                    "border-color": theme.accentColor,
                  }}
                  class="text-base leading-relaxed border-[1px] w-fit rounded-md p-1"
                >
                  Secondary background color: {theme.secondaryBackgroundColor}
                </p>
                <p
                  style={{
                    color: theme.backgroundColor,
                    "background-color": theme.textColor,
                    "border-color": theme.accentColor,
                  }}
                  class="text-base leading-relaxed border-[1px] w-fit rounded-md p-1"
                >
                  Text color: {theme.textColor}
                </p>
                <p
                  style={{
                    color: theme.backgroundColor,
                    "background-color": theme.iconColor,
                    "border-color": theme.accentColor,
                  }}
                  class="text-base leading-relaxed border-[1px] w-fit rounded-md p-1"
                >
                  Icon color: {theme.iconColor}
                </p>
                <p
                  style={{
                    color: theme.textColor,
                    "background-color": theme.accentColor,
                    "border-color": theme.accentColor,
                  }}
                  class="text-base leading-relaxed border-[1px] w-fit rounded-md p-1"
                >
                  Accent color: {theme.accentColor}
                </p>
              </div>
            </div>
            <div
              style={{
                "background-color": theme.secondaryBackgroundColor,
              }}
              class="flex items-center m-4 rounded-md p-3"
            >
              <div class="tooltip">
                <button
                  onMouseLeave={handleLeave}
                  onClick={handleCopyToClipboard}
                  style={{
                    "background-color": theme.accentColor,
                    color: theme.textColor,
                  }}
                  type="button"
                  class="text-white hover:opacity-90 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <span class="tooltiptext" id="myTooltip">
                    {toolTipText()}
                  </span>
                  Copy theme
                </button>
              </div>

              <button
                style={{
                  "border-color": theme.accentColor,
                  color: theme.textColor,
                }}
                data-modal-hide={name}
                type="button"
                class="ms-3 hover:opacity-90 rounded-lg border text-sm font-medium px-5 py-2.5"
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
        style={{ "background-color": theme.backgroundColor }}
        class="flex flex-col w-full h-64 px-7 py-4 rounded-md border-[1px] border-gray-100 border-opacity-10 mb-5"
      >
        <div
          style={{
            "background-color": theme.secondaryBackgroundColor,
          }}
          class="rounded-md p-4 h-full w-full flex items-center justify-between"
        >
          <p class="text-5xl" style={{ color: theme.textColor }}>
            {name}
          </p>
        </div>
        <div class="grid gap-6 grid-cols-3 mt-5 w-full">
          <For each={Object.keys(reorderedObject)}>
            {(key) => (
              <div
                style={{
                  border: "1px solid",
                  "border-color": theme.accentColor,
                  "background-color": theme[key as keyof ThemeType],
                }}
                class="rounded-md h-9 w-9"
              />
            )}
          </For>
        </div>
      </button>
    </div>
  )
}

export default ThemeCard
