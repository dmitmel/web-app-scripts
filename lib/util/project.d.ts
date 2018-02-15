import { Config } from './config';

declare namespace findProject {
  interface Project {
    directory: string;
    config: Config;
    resolve(...paths: string[]): string;
  }
}

declare function findProject(
  searchDirectory: string
): Promise<findProject.Project>;

export = findProject;
