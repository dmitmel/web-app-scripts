declare namespace findProject {
  interface Project {
    directory: string;
    config: any;
    resolve(...paths: string[]): string;
  }
}

declare function findProject(cwd: string): Promise<findProject.Project>;

export = findProject;
