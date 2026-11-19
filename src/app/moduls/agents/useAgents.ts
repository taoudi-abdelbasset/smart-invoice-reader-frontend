import { useEffect, useState } from "react";
import { agentService } from "./agentService";
import type { Agent, AgentCreateInput, AgentUpdateInput } from "./types";

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    agentService
      .getMine()
      .then(setAgents)
      .catch(() => setError("Could not load agents"))
      .finally(() => setLoading(false));
  }, []);

  const createAgent = async (input: AgentCreateInput) => {
    const created = await agentService.create(input);
    setAgents((prev) => [...prev, created]);
    return created;
  };

  const replaceAgent = (agent: Agent) =>
    setAgents((prev) => prev.map((a) => (a.id === agent.id ? agent : a)));

  const updateAgent = async (id: string, input: AgentUpdateInput) => {
    const updated = await agentService.update(id, input);
    replaceAgent(updated);
    return updated;
  };

  const removeAgent = async (id: string) => {
    await agentService.remove(id);
    setAgents((prev) => prev.filter((a) => a.id !== id));
  };

  return {
    agents,
    loading,
    error,
    createAgent,
    updateAgent,
    removeAgent,
    replaceAgent,
  };
}

export type AgentsContext = ReturnType<typeof useAgents>;
