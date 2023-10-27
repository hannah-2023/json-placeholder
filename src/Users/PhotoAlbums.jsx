import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function PhotoAlbums({ userId }) {
  const [titleAlbum, setTitle] = useState("");
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then((response) => response.json())
      .then((response) => setAlbums(response));
  }, []);

  const addNewTitle = (e) => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/albums`, {
      method: "POST",
      body: JSON.stringify({
        title: titleAlbum,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res) => setAlbums([...albums, res]));
  };

  const onDelete = (albumId) => {
    console.log(albumId)
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
      method: "DELETE",
    })
    .then(() => setAlbums(albums.filter(album => album.id !== albumId)))
  };
  return (
    <div className="photo-albums mt-4">
      <p className="fs-4 fw-semibold border-top pt-3">
        Photo Albums:
      </p>
      <div className="row">
        <div className="col-6">
          <form className="d-flex gap-3" onSubmit={(e) => addNewTitle(e)}>
            <input
              type="text"
              className="form-control py-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Title of new album"
              value={titleAlbum}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-success flex-shrink-0 py-2 px-4 fs-5"
            >
              New Album
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        {albums.map((album, index) => (
          <div key={album.id} className="col-6 my-3">
            <div className="d-flex justify-content-between border rounded align-items-center">
              <div
                className="py-2 flex-shrink-0 border-end d-flex items-center justify-content-center"
                style={{ width: "10%" }}
              >
                {index + 1}
              </div>
              <div className="album-title py-2 fw-bolder text-start w-100 ps-2">
                {album.title}
              </div>
              <div className="" style={{ width: "10%" }}>
                <button
                  type="button"
                  className="delete bg-danger rounded-1 text-white px-2"
                  onClick={() => onDelete(album.id)}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
