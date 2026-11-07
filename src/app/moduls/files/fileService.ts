import http from "../../tools/http";
import type { UploadedFile } from "./types";

export const fileService = {
  upload: (conversationId: string, file: File) => {
    const form = new FormData();
    form.append("conversation_id", conversationId);
    form.append("upload", file);
    return http<UploadedFile>("files/upload", { method: "POST", body: form });
  },
};
