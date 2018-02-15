declare namespace loadConfig {
  interface Config {
    filePath: string;
    data: any;
  }
}

declare function loadConfig(
  searchDirectory: string
): Promise<loadConfig.Config>;

export = loadConfig;
