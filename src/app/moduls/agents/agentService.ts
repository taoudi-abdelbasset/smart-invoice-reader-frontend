import http from "../../tools/http";
import type { Agent, AgentCreateInput, AgentUpdateInput } from "./types";

export const agentService = {
  getMine: () => http<Agent[]>("agents/mine"),

  create: (input: AgentCreateInput) =>
    http<Agent>("agents/", { method: "POST", body: JSON.stringify(input) }),

  update: (id: string, input: AgentUpdateInput) =>
    http<Agent>(`agents/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  remove: (id: string) => http<void>(`agents/${id}`, { method: "DELETE" }),

  attachTool: (id: string, toolId: string) =>
    http<Agent>(`agents/${id}/tools`, {
      method: "POST",
      body: JSON.stringify({ tool_id: toolId }),
    }),

  detachTool: (id: string, toolId: string) =>
    http<Agent>(`agents/${id}/tools/${toolId}`, { method: "DELETE" }),
};
