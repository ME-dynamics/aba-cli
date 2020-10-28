import { readdirSync } from "fs-extra";
import { is_root_dir } from "./is_root_dir";
import { is_packages_dir } from "./is_packages_dir";
import { traverse_up_validation } from "./traverse_up_validation"
import { i_valid_directory } from "../types";






export function is_valid_directory(): i_valid_directory {
  // getting current path that cli is running from
  const path = process.cwd();
  const file_list = readdirSync(path);

  // check if it's in service root directory
  const is_service_root = is_root_dir(file_list, "service");
  if (is_service_root.valid_dir) return is_service_root;

  // check if it's in nodelib root directory
  const is_node_lib_root = is_root_dir(file_list, "nodelib");
  if (is_node_lib_root.valid_dir) return is_node_lib_root;
  // TODO: check rrn

  // check if it's in packages directory
  const is_packages = is_packages_dir(file_list);
  if (is_packages.valid_dir) return is_packages;

  // check if it's down the road of service
  const service_traverse = traverse_up_validation(path, "service");
  if (service_traverse.valid_dir) return service_traverse;

  const nodelib_traverse = traverse_up_validation(path, "nodelib");
  if (nodelib_traverse.valid_dir) return nodelib_traverse;
  
  return {
    valid_dir: false,
    base: undefined,
    type: undefined,
  };
}
