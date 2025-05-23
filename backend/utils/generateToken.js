import jwt from "jsonwebtoken";

const generateToken = (user, res) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "4h",
    }
  );

  // Set the token in a cookie
  // The cookie will be sent to the client and stored in the browser
  res.cookie("jwt", token, {
    maxAge: 4 * 60 * 60 * 1000, // 4 hours
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie - prevents XSS attacks(Cross-Site Scripting Attacks)
    sameSite: "strict", // Prevents CSRF attacks (Cross-Site Request Forgery Attacks)
    secure: process.env.NODE_ENV === "production", // Only send the cookie over HTTPS in production
  });
  return token; // Return the token if needed (optional)
};
export default generateToken;

//? Difference between storing JWT token via Cookies (Backend) vs LocalStorage/SessionStorage (Frontend):
//* 1. Storage Location
// Cookies (Backend): Stored in browser cookies; set via server response (e.g., Set-Cookie header).
// LocalStorage/SessionStorage (Frontend): Stored using JavaScript in browser storage.

//* 2. Security
// Cookies (HttpOnly + Secure): More secure; not accessible via JavaScript → protects against XSS attacks.
// LocalStorage/SessionStorage: Vulnerable to XSS; JavaScript can read/write tokens.

//* 3. Automatic Sending
// Cookies: Automatically sent with every request to the server (if withCredentials is set in CORS).
// LocalStorage/SessionStorage: Manual inclusion in Authorization header required.

//* 4. Expiry Control
// Cookies: Expiry set via Expires or Max-Age attributes.
// LocalStorage: No expiry until manually cleared.
// SessionStorage: Cleared when tab/window is closed.

//* 5. Cross-Site Request Forgery (CSRF)
// Cookies: Vulnerable to CSRF (unless using SameSite=Strict or tokens).
// LocalStorage/SessionStorage: Not automatically sent → safer from CSRF.

//* 6. Use Case Suitability
// Cookies: Best for server-side rendered apps or apps needing automatic auth headers.
// LocalStorage/SessionStorage: Better for SPAs handling tokens manually with custom headers.
