import { useSession } from "next-auth/react";

import useCreateUser from "@/hooks/user/commands/create/useCreateUser";

export function useAuthSession() {
  const session = useSession();
  const { createUser } = useCreateUser();

  if (session.data?.user.email) {
    const email = session.data.user.email;
    createUser(email);
  }
  return session;
}
