// GoogleLoginBtn.jsx
import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

export default function GoogleLoginBtn({ onSuccessServer }) {
  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          // credentialResponse.credential is the ID token (JWT)
          const id_token = credentialResponse.credential;
          try {
            // send id_token to backend for verification / create user
            const res = await fetch("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include", // if backend sets httpOnly cookie
              body: JSON.stringify({ id_token })
            });
            const data = await res.json();
            if (res.ok) {
              // data contains your app's JWT or user object
              onSuccessServer && onSuccessServer(data);
            } else {
              alert(data.message || "Google login failed");
            }
          } catch (err) {
            console.error(err);
            alert("Network error");
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}
