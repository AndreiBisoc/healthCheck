const API_URL = "http://localhost:4000/users";

export const register = async (user) =>{
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
