export type Role = "speaker" | "listener";

export type SpeakerProfile = {
  motives: string[];
  helpToday: string;
  listenerGender: string;
  timeBand: string;
  softTags: string[];
  displayMode: "nickname" | "name";
  completed: boolean;
};

export type ListenerProfile = {
  bio: string;
  livedExperience: string;
  availabilityNote: string;
  trainingDone: boolean;
  quizPassed: boolean;
  available: boolean;
  fiscalReady: boolean;
  completed: boolean;
};

export type UserSession = {
  id: string;
  email: string;
  role: Role;
  nickname: string;
  ageVerified: boolean;
  tokens: number;
  speaker?: SpeakerProfile;
  listener?: ListenerProfile;
  createdAt: string;
};

const STORAGE_KEY = "ascoltami_session_v1";
const AGE_COOKIE = "ascoltami_age_ok";

export function getAgeCookieName() {
  return AGE_COOKIE;
}

export function readSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserSession;
  } catch {
    return null;
  }
}

export function writeSession(session: UserSession) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("ascoltami-session"));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("ascoltami-session"));
}

export function setAgeVerifiedCookie(ok: boolean) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${AGE_COOKIE}=${ok ? "1" : "0"}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function isAgeVerifiedFromCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c === `${AGE_COOKIE}=1`);
}

export function createSession(input: {
  email: string;
  role: Role;
  nickname?: string;
}): UserSession {
  const nick =
    input.nickname?.trim() ||
    (input.role === "speaker"
      ? `voce-${Math.random().toString(36).slice(2, 6)}`
      : `ascolto-${Math.random().toString(36).slice(2, 6)}`);

  const session: UserSession = {
    id: crypto.randomUUID(),
    email: input.email.trim().toLowerCase(),
    role: input.role,
    nickname: nick,
    ageVerified: true,
    tokens: 0,
    createdAt: new Date().toISOString(),
    speaker:
      input.role === "speaker"
        ? {
            motives: [],
            helpToday: "",
            listenerGender: "indifferente",
            timeBand: "sera",
            softTags: [],
            displayMode: "nickname",
            completed: false,
          }
        : undefined,
    listener:
      input.role === "listener"
        ? {
            bio: "",
            livedExperience: "",
            availabilityNote: "",
            trainingDone: false,
            quizPassed: false,
            available: false,
            fiscalReady: false,
            completed: false,
          }
        : undefined,
  };
  writeSession(session);
  setAgeVerifiedCookie(true);
  return session;
}

export function requireAgeGatePath(nextPath: string): string {
  return `/eta?next=${encodeURIComponent(nextPath)}`;
}
