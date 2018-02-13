declare namespace loadConfig {
  interface Config {
    filePath: string;
    data: any;
  }
}

declare function loadConfig(projectDir: string): Promise<loadConfig.Config>;

export = loadConfig;
