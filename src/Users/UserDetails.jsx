import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditContact from "./EditContact";
import PhotoAlbums from "./PhotoAlbums";

export default function UserDetails() {
  const [formEdit, showFormEdit] = useState(false);
  const [user, setUser] = useState();
  const { userId } = useParams();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((res) => setUser(res));
  }, [userId]);
  //console.log(user);

  const handleEdit = () => {
    showFormEdit(true);
  };

  return (
    <>
      {user && (
        <>
          <div className="user-info col-12">
            <p className="fs-2 fw-bolder">{user.name}</p>
            <div className="row gap-4">
              <div className="col">
                <p className="fs-4 fw-semibold text-info mt-2 mb-0">
                  Personal:
                </p>
                <div className="row">
                  <div className="col-4">Id:</div>
                  <div className="col-8 fw-bolder">{user.id}</div>
                </div>
                <div className="row">
                  <div className="col-4">Username:</div>
                  <div className="col-8 fw-bolder">{user.username}</div>
                </div>
                <p className="fs-4 fw-semibold text-info mt-4 mb-0">Address:</p>
                <div className="row">
                  <div className="col-4">Street:</div>
                  <div className="col-8 fw-bolder">{user.address.street}</div>
                </div>
                <div className="row">
                  <div className="col-4">Suite:</div>
                  <div className="col-8 fw-bolder">{user.address.suite}</div>
                </div>
                <div className="row">
                  <div className="col-4">City:</div>
                  <div className="col-8 fw-bolder">{user.address.city}</div>
                </div>
                <div className="row">
                  <div className="col-4">Zipcode:</div>
                  <div className="col-8 fw-bolder">{user.address.zipcode}</div>
                </div>
                <p className="fs-4 fw-semibold text-info mt-4 mb-0">Company:</p>
                <div className="row">
                  <div className="col-4">Name:</div>
                  <div className="col-8 fw-bolder">{user.company.name}</div>
                </div>
                <div className="row">
                  <div className="col-4">CatchPhrase:</div>
                  <div className="col-8 fw-bolder">
                    {user.company.catchPhrase}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">Bs:</div>
                  <div className="col-8 fw-bolder">{user.company.bs}</div>
                </div>
              </div>
              <div className="col">
                <p className="fs-4 fw-semibold text-info mt-4 mb-0">Contact:</p>
                {!formEdit && (
                  <div>
                    <div className="row">
                      <div className="col-4">Email:</div>
                      <div className="col-8 fw-bolder">{user.email}</div>
                    </div>
                    <div className="row">
                      <div className="col-4">Website:</div>
                      <div className="col-8 fw-bolder">{user.website}</div>
                    </div>
                    <div className="row">
                      <div className="col-4">Phone:</div>
                      <div className="col-8 fw-bolder">{user.phone}</div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-success my-2"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                  </div>
                )}
                {formEdit && (
                  <EditContact
                    user={user}
                    setUser={setUser}
                    userId={userId}
                    formEdit={formEdit}
                    showFormEdit={showFormEdit}
                  />
                )}
              </div>
            </div>
          </div>
          <PhotoAlbums userId={userId} />
        </>
      )}
    </>
  );
}
