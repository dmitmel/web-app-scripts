export type Config = {
  filePath: string;
  data: { [key: string]: any };
};

export function loadConfig(cwd?: string): Promise<Config | null>;
