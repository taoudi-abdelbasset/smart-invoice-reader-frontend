import { useEffect, useState } from "react";
import { agentService } from "./agentService";
import { toolService } from "../tools/toolService";
import type { Agent } from "./types";
import type { Tool } from "../tools/types";

type Props = {
  agent: Agent;
  onChange: (agent: Agent) => void;
};

export default function AgentToolsPanel({ agent, onChange }: Props) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    toolService
      .getAll()
      .then(setTools)
      .catch(() => setError("Could not load tools"))
      .finally(() => setLoading(false));
  }, []);

  const attachedIds = new Set(agent.tools.map((t) => t.id));

  async function toggle(tool: Tool) {
    setBusyId(tool.id);
    try {
      const updated = attachedIds.has(tool.id)
        ? await agentService.detachTool(agent.id, tool.id)
        : await agentService.attachTool(agent.id, tool.id);
      onChange(updated);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  if (loading) return <div className="spinner-border" />;

  return (
    <>
      {error && <div className="alert alert-danger py-2">{error}</div>}

      {tools.length === 0 && <p className="text-muted">No tools available.</p>}

      <div className="list-group">
        {tools.map((tool) => (
          <label
            key={tool.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="me-3">
              <div className="fw-semibold">{tool.name}</div>
              <small className="text-muted">{tool.desc}</small>
            </div>
            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={attachedIds.has(tool.id)}
                disabled={busyId === tool.id}
                onChange={() => toggle(tool)}
              />
            </div>
          </label>
        ))}
      </div>
    </>
  );
}
