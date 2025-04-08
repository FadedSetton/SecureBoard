import { UserLogin } from "../interfaces/UserLogin";


const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route

  try{
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userInfo),
    })
  
    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed");
  }
}



export { login };
