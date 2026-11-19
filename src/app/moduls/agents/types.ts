import type { Tool } from "../tools/types";

export type Agent = {
  id: string;
  agent_name: string;
  agent_id: string;
  desc: string;
  role: string;
  system_prompt: string;
  tools: Tool[];
  created_at: string;
  deleted_at: string | null;
};

export type AgentCreateInput = {
  agent_name: string;
  agent_id: string;
  desc: string;
  role: string;
  system_prompt: string;
};

export type AgentUpdateInput = Partial<Omit<AgentCreateInput, "agent_id">>;
