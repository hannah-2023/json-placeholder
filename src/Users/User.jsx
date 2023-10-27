import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserDetails from "./UserDetails";

export default function Users() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((user) => setUsers(user));
  }, []);

  const handleClick = (e, id) => {
    navigate(`/users/${id}`);
  };
  return (
    <>
      {!userId && (
        <div className="user-table">
          <h2>Users</h2>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">username</th>
                <th scope="col">email</th>
                <th scope="col">phone</th>
                <th scope="col">website</th>
                <th scope="col">city</th>
                <th scope="col">Company Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} onClick={(e) => handleClick(e, user.id)}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                  <td>{user.address.city}</td>
                  <td>{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {userId && <UserDetails />}
    </>
  );
}
