export interface ForumLocalUser {
  id: string;
  name: string;
  email: string;
  specialty?: string | null;
  crm_number?: string | null;
}

const KEY = "dama_forum_user_v1";

export function loadForumUser(): ForumLocalUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ForumLocalUser;
  } catch {
    return null;
  }
}

export function saveForumUser(user: ForumLocalUser) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(user));
  } catch {
    /* ignore */
  }
}
