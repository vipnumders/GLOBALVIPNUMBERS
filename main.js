// main.js
import { auth, provider } from "./firebase.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const googleLoginBtn = document.getElementById("googleLoginBtn");

if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User info:", result.user);
      alert(`Logged in as: ${result.user.displayName || result.user.email}`);
    } catch (error) {
      console.error("Login error:", error);
      alert("Error: " + (error?.message || "Unknown error"));
    }
  });
}
