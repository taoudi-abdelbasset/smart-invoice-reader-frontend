import { useState, type ChangeEvent } from "react";

type Props = {
  onUpload: (file: File) => Promise<void>;
};

export default function FileUpload({ onUpload }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      await onUpload(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      input.value = "";
    }
  }

  return (
    <div className="position-relative">
      {error && (
        <small className="text-danger position-absolute bottom-100 start-0 mb-1 text-nowrap">
          {error}
        </small>
      )}
      <label
        className={`btn mb-0 ${error ? "btn-outline-danger" : "btn-outline-secondary"} ${busy ? "disabled" : ""}`}
        title="Attach a PDF or image"
      >
        {busy ? <span className="spinner-border spinner-border-sm" /> : "📎"}
        <input
          type="file"
          hidden
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleChange}
          disabled={busy}
        />
      </label>
    </div>
  );
}
