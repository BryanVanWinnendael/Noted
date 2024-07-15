import useCommandSettings from "./useCommandSettings";
import { CommandSettingsProps } from "./useCommandSettings";

interface CommandSettings {
  [key: string]: () => void;
}

const useCommands = ({
  settingsProps,
}: {
  settingsProps: CommandSettingsProps;
}): CommandSettings => {
  const settings = useCommandSettings(settingsProps);

  return {
    ...settings,
  };
};

export default useCommands;
