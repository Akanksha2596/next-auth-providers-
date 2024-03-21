// import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  // providers: [
  //   GithubProvider({
  //     clientId: "763a37a23808adbc5fba",
  //     clientSecret: "4d7712f0b5f40f68d60f2c249aa696186609d29b",
  //   }),
  // ],
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
  //     async authorize(credentials, req) {
  //       // Add logic here to look up the user from the credentials supplied
  //       // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
         
  //       const res = await fetch("http://localhost:3000/auth/login", {    //backend url where post request is send on login toverify the user
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           username: credentials?.username,
  //           password: credentials?.password,
  //         }),
  //       });
  //       const user = await res.json();
  //       if (user) {
  //         // Any object returned will be saved in `user` property of the JWT
  //         return user;
  //       } else {
  //         // If you return null then an error will be displayed advising the user to check their details.
  //         return null;
  
  //         // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
  //       }
  //     }
  //   })
  // ],
  // callbacks: {
  //   async jwt({ token, user }: any) {  //object containing token and user and return a single obj containing them as jwt to next-auth
  //     return { ...token, ...user };
  //   },
  //   async session({ session, token } :any ) {
  //     session.user = token as any;   // getting the return jwt in session obj of next-auth
  //     return session;
  //   },
  // },
  async authorize(credentials, req) {
    try {
      const res = await fetch("https://strapi.training.brainvire.net/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation Login($identifier: String!, $password: String!) {
              login(input: { identifier: $identifier, password: $password }) {
                jwt
                user {
                  id
                  username
                  email
                }
              }
            }
          `,
          variables: {
            identifier: credentials?.username,
            password: credentials?.password,
          }
        }),
      });
      const { data, errors } = await res.json();
      if (data && data.login && data.login.jwt && data.login.user) {
        return { ...data.login.user, jwt: data.login.jwt }; // Return user data along with JWT token
      } else {
        console.error("Authentication failed:", errors);
        return null; // Return null if authentication fails
      }
    } catch (error) {
      console.error("Authentication error:", error);
      return null;
    }
  }
})
],
callbacks: {
async jwt({ token, user }: any) {
  // Store the JWT token in the session
  if (user && token) {
    return { ...token, ...user };
  }
  console.log(user, "user");
  return token;
},
async session({ session, token }: any) {
  // Store user data from token in session
  session.user = token;
  console.log("session function in next auth", session);
  return session;
},
},
};

export default NextAuth(authOptions);
