const API_URL = "http://localhost:4000/users";

export const register = async (user) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
};

export const login = async (user) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();
  return jsonResponse;
};

export const healthCheck = async (email) => {
  const response = await fetch(`${API_URL}/health/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
