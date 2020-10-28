import { t_libraries } from './command_actions';

export interface i_valid_directory {
    valid_dir: boolean;
    base: "root" | "packages" | "down_the_road" | "src" | undefined;
    type: t_libraries | undefined;
  }