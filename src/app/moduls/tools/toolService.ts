import http from "../../tools/http";
import type { Tool } from "./types";

export const toolService = {
  getAll: () => http<Tool[]>("tools/"),
};