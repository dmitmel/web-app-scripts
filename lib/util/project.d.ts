import { Config } from './config';

declare namespace project {
  interface Project {
    directory: string;
    config: Config;
    resolve(...paths: string[]): string;
  }

  function findProject(searchDirectory: string): Promise<Project>;
}

export = project;
