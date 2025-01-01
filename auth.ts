import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Asegúrate de tener estas variables en tu .env
const JWT_SECRET = process.env.JWT_SECRET!;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github],

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    // Se ejecuta cuando se crea el JWT token
    async jwt({ token, user, account }) {
      // Si es un nuevo inicio de sesión
      if (account && user) {
        return {
          ...token,
          accessToken: jwt.sign(
            {
              id: user.id,
              email: user.email,
              name: user.name,
              picture: user.image,
              provider: account.provider,
            },
            JWT_SECRET,
            {
              expiresIn: "1d", // Token expira en 1 día
            }
          ),
        };
      }
      return token;
    },

    // Se ejecuta cuando se crea la sesión
    async session({ session, token }) {
      if (token && session.user) {
        session.user.accessToken = token.accessToken as string;
        // Puedes agregar más información a la sesión si lo necesitas
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },

  // Configuración adicional de JWT
  jwt: {
    maxAge: 60 * 60 * 24, // 1 día
  },
});
