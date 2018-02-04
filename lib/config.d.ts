export type Config = {
  filePath: string;
  data: { [key: string]: any };
};

export function loadConfig(): Config;
export function loadConfigFile(filePath: string): Config;
