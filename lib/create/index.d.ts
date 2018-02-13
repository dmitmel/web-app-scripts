declare namespace create {
  interface Options {
    force?: boolean;
    name?: string;
    description?: string;
  }
}

declare function create(directory: string, options: create.Options): void;

export = create;
