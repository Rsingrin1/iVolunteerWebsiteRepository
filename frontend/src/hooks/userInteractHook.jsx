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

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // fetch user by ID
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // update user
  const updateUser = async () => {
    return axios.put(
      `http://localhost:5000/api/update/user/${id}`,
      user
    );
  };

  return {
    user,
    setUser,
    inputHandler,
    updateUser,
  };
}
