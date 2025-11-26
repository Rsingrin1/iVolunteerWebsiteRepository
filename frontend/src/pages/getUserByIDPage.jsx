import { useEffect, useState } from "react";
import "../assets/adduser.css";
import axios from "axios";

const getUserByID = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/:691ffde1a9ca2e914144518b");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="userTable">

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">userID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email} </td>
                <td>{user._id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default getUserByID;
