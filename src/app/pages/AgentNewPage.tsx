import { useNavigate, useOutletContext } from "react-router-dom";
import AgentForm from "../moduls/agents/AgentForm";
import type { AgentsContext } from "../moduls/agents/useAgents";

export default function AgentNewPage() {
  const { createAgent } = useOutletContext<AgentsContext>();
  const navigate = useNavigate();

  return (
    <>
      <h4 className="mb-3">New agent</h4>
      <AgentForm
        mode="create"
        submitLabel="Create agent"
        onSubmit={async (values) => {
          const created = await createAgent(values);
          navigate(`/agents/${created.id}`);
        }}
      />
    </>
  );
}
