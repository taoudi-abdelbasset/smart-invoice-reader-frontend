import { useState } from "react";
import {
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import AgentForm from "../moduls/agents/AgentForm";
import AgentToolsPanel from "../moduls/agents/AgentToolsPanel";
import type { AgentsContext } from "../moduls/agents/useAgents";

type Props = { tab: "details" | "tools" };

const tabClass = ({ isActive }: { isActive: boolean }) =>
  "nav-link" + (isActive ? " active" : "");

export default function AgentDetailPage({ tab }: Props) {
  const { id } = useParams();
  const { agents, updateAgent, removeAgent, replaceAgent } =
    useOutletContext<AgentsContext>();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const agent = agents.find((a) => a.id === id);
  if (!agent)
    return <div className="alert alert-warning">Agent not found.</div>;

  async function handleDelete() {
    if (!agent || !window.confirm(`Delete "${agent.agent_name}"?`)) return;
    try {
      await removeAgent(agent.id);
      navigate("/agents");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h4 className="mb-0">{agent.agent_name}</h4>
          <small className="text-muted">{agent.agent_id}</small>
        </div>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <NavLink end to={`/agents/${agent.id}`} className={tabClass}>
            Details
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={`/agents/${agent.id}/tools`} className={tabClass}>
            Tools{" "}
            <span className="badge text-bg-secondary">
              {agent.tools.length}
            </span>
          </NavLink>
        </li>
      </ul>

      {tab === "details" ? (
        <AgentForm
          key={agent.id}
          mode="edit"
          initial={agent}
          submitLabel="Save changes"
          onSubmit={async ({ agent_id, ...changes }) => {
            await updateAgent(agent.id, changes);
          }}
        />
      ) : (
        <AgentToolsPanel agent={agent} onChange={replaceAgent} />
      )}
    </>
  );
}
