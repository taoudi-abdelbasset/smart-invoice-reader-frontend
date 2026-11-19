import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Agent, AgentCreateInput } from "./types";

type Props = {
  mode: "create" | "edit";
  initial?: Agent;
  submitLabel: string;
  onSubmit: (values: AgentCreateInput) => Promise<void>;
};

export default function AgentForm({
  mode,
  initial,
  submitLabel,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<AgentCreateInput>({
    agent_name: initial?.agent_name ?? "",
    agent_id: initial?.agent_id ?? "",
    desc: initial?.desc ?? "",
    role: initial?.role ?? "",
    system_prompt: initial?.system_prompt ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set =
    (key: keyof AgentCreateInput) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setSaved(false);
    };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit(values);
      setSaved(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">Agent name</label>
          <input
            className="form-control"
            value={values.agent_name}
            onChange={set("agent_name")}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Agent ID</label>
          <input
            className="form-control"
            value={values.agent_id}
            onChange={set("agent_id")}
            pattern="[a-z0-9_]+"
            title="Lowercase letters, digits and underscores only"
            disabled={mode === "edit"}
            required
          />
          {mode === "create" && (
            <div className="form-text">
              Lowercase letters, digits, underscores. Cannot be changed later.
            </div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Role</label>
        <input
          className="form-control"
          value={values.role}
          onChange={set("role")}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={2}
          value={values.desc}
          onChange={set("desc")}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">System prompt</label>
        <textarea
          className="form-control font-monospace"
          rows={14}
          value={values.system_prompt}
          onChange={set("system_prompt")}
          required
        />
      </div>

      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : submitLabel}
        </button>
        {saved && <span className="text-success small">Saved</span>}
      </div>
    </form>
  );
}
