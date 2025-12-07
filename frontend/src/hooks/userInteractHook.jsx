import { useEffect, useState } from "react";
import axios from "axios";

export default function useUser(id) {
  const initialState = {
    username: "",
    email: "",
    _id: "",
    notifSetting: false,
    bio: "",
    phone: "",
    name: {
      fname: "",
      lname: "",
    },
  };

  const [user, setUser] = useState(initialState);
  const token = localStorage.getItem("authToken");

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // fetch user by ID from token
  useEffect(() => {
    if (!token) return; // Don't fetch if no token

    axios
      .get(`http://localhost:5000/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Error fetching user:", err.response?.status, err.message);
      });
  }, [token]); // Only depend on token

  // update user
  const updateUser = async () => {
    return axios.put(
      `http://localhost:5000/api/user`,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return {
    user,
    setUser,
    inputHandler,
    updateUser,
  };
}
