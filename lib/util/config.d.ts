declare namespace config {
  interface Config {
    filePath: string;
    data: any;
  }

  const explorer: any;

  function loadConfig(searchDirectory: string): Promise<Config>;
}

export = config;
