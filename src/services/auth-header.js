export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return {
      "x-access-token": user.accessToken,
      // "Content-Type": "application/json",
    };
  } else {
    return {};
  }
}

// export default function authHeader() {
//   const accessToken = JSON.parse(localStorage.getItem("accessToken"));

//   if (accessToken) {
//     // for Node.js Express back-end
//     return {
//       "x-access-token": accessToken,
//       // "Content-Type": "application/json",
//     };
//   } else {
//     return {};
//   }
// }
