"use client";
// import Button from "@/components/Button";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// const HomePage = () => {
//   const { data: session } = useSession();
//   const [posts, setPosts] = useState();
//   const fetchPost = async () => {
//     const res = await fetch("", {
//       method: "Get",
//       headers: {
//         // authorization: `bearer ${session?.user.accessToken}`,
//       },
//     });

//     const response = await res.json();
//     setPosts(response);
//   };
//   return (
//     <div>
//       <Button onClick={fetchPost}>Get User Posts</Button>
//       {posts && JSON.stringify(posts)}
//     </div>
//   );
// };

// export default HomePage;
import { useSession } from 'next-auth/react';

function HomePage() {
  const { data: session, status } = useSession();
  console.log(session, "session");
  // If session is loading, displaying a loading message
  if (status === 'loading') {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  // user is authenticated, displaying user details
  if (session?.user) {
    const { username, email, id } = session.user;
    console.log("userName" , username);
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Welcome, {username}!</h1>
        <p style={{ fontSize: '16px' }}>Your email: {email}</p>
        <p style={{ fontSize: '16px' }}>Your Id: {id}</p>
        {/* Add more user details here if needed */}
      </div>
    );
  }

  // If user is not authenticated, redirect to login page
  return <div style={{ textAlign: 'center', marginTop: '50px' }}>You are not logged in. Please log in to view this page.</div>;
}

export default HomePage;