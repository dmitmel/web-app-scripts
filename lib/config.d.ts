declare namespace config {
  function loadConfig(cwd?: string): Promise<Config | null>;

  interface Config {
    filePath: string;
    data: { [key: string]: any };
  }
}

export = config.loadConfig;
