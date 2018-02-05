export type Config = {
  filePath: string;
  data: { [key: string]: any };
};

export function loadConfig(cwd?: string): Config;
export function loadConfigFile(filePath: string): Config;
