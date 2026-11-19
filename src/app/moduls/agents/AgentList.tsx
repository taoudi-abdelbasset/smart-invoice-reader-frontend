import { Link, NavLink } from "react-router-dom";
import type { Agent } from "./types";

type Props = { agents: Agent[] };

export default function AgentList({ agents }: Props) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Agents</h6>
        <Link to="/agents/new" className="btn btn-primary btn-sm">
          New agent
        </Link>
      </div>

      <div className="list-group list-group-flush overflow-auto flex-grow-1">
        {agents.length === 0 && (
          <p className="text-muted text-center small my-4">No agents yet</p>
        )}

        {agents.map((a) => (
          <NavLink
            key={a.id}
            to={`/agents/${a.id}`}
            className={({ isActive }) =>
              "list-group-item list-group-item-action" +
              (isActive ? " active" : "")
            }
          >
            <div className="fw-semibold text-truncate">{a.agent_name}</div>
            <small className="text-truncate d-block opacity-75">{a.role}</small>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
