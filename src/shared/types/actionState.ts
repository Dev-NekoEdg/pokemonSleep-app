/** Shape returned by every mutating Server Action, consumed by `useActionState`. */
export type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export const initialActionState: ActionState = { success: false };
