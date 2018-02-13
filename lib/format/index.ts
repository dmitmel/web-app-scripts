declare namespace format {
  interface Options {
    directory?: string;
    check?: boolean;
  }
}

declare function format(options: format.Options): void;

export = format;
