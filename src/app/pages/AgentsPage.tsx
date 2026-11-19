import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AgentList from "../moduls/agents/AgentList";
import { useAgents } from "../moduls/agents/useAgents";

export default function AgentsPage() {
  const ctx = useAgents();

  if (ctx.loading)
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" />
      </div>
    );

  return (
    <>
      <Navbar />

      <div
        className="container-fluid bg-light"
        style={{ height: "calc(100vh - 56px)" }}
      >
        {ctx.error && (
          <div className="alert alert-danger py-2 mt-3 mb-0">{ctx.error}</div>
        )}

        <div className="row h-100 py-3 g-3">
          <div className="col-md-4 col-lg-3 h-100" style={{ minHeight: 0 }}>
            <AgentList agents={ctx.agents} />
          </div>

          <div className="col-md-8 col-lg-9 h-100" style={{ minHeight: 0 }}>
            <div className="card shadow-sm h-100">
              <div className="card-body overflow-auto">
                <Outlet context={ctx} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
