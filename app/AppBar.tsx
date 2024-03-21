"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const AppBar = () => {
  const { data: session } = useSession();
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #a5f3ff, #6bc3ff)",
        padding: "0.5rem",
        display: "flex",
        gap: "0.5rem",
      }}
    >
      <div style={{ marginLeft: "auto", display: "flex", gap: "0.2rem" }}>
        {session?.user ? (
          <>
            <p style={{ color: "#3297b0" }}>Hello {session.user.username}</p>
            <button
              style={{
                color: "#ff4d4d",
                cursor: "pointer",
                border: "none",
                background: "none",
              }}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            style={{
              color: "#00b300",
              cursor: "pointer",
              border: "none",
              background: "none",
            }}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default AppBar;
