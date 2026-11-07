import type { UploadedFile } from "../files/types";
import type { Message } from "../messages/types";
import type { UserInfo } from "../users/types";

export type Conversation = {
  user_id: string;
  session_id: string;
  title: string;
  created_at: string;
  user: UserInfo;
  files: UploadedFile[];
  messages: Message[];
};
