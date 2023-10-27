import { useEffect, useState } from "react";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [start, setStart] = useState(0);
  const [searchValue, setSearhValue] = useState("");
  const [searchStart, setSearchStart] = useState(0);
  useEffect(() => {
    if (searchValue) {
      fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=${searchStart}&_limit=12&albumId=${searchValue}`
      )
        .then((response) => response.json())
        .then((res) => setPhotos([...photos, ...res]));
    } else {
      fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=12`
      )
        .then((response) => response.json())
        .then((res) => setPhotos([...photos, ...res]));
    }
  }, [start, searchStart]);

  const onLoading = () => {
    if (searchValue && searchStart < 50) {
      setSearchStart((prev) => prev + 12);
    }

    if (!searchValue) {
      setStart((prev) => prev + 12);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isNaN(searchValue) && searchValue > 1) {
      fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=0&_limit=12&albumId=${searchValue}`
      )
        .then((response) => response.json())
        .then((response) => setPhotos(response))
        .then(() => setSearchStart(12));
    }
  };

  return (
    <div className="photos">
      <p className="fs-2 fw-bold mt-2 mb-0">Photos:</p>
      <div className="row my-3">
        <div className="col-12 d-flex gap-2 w-50">
          <select className="form-select" aria-label="Default select example">
            <option value="1">Album Id</option>
          </select>
          <form className="d-flex search" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by album id"
              aria-label="Search"
              value={searchValue}
              onChange={(e) => setSearhValue(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="row">
        {photos &&
          photos.map((photo, index) => (
            <div key={index} className="col-3 gap-2 mb-4">
              <div className="card">
                <img src={photo.url} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{photo.title}</h5>
                  <p className="card-text">Id: #{photo.id}</p>
                  <p className="card-text">Album Id: #{photo.albumId}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="load-btn btn btn-primary m-2"
          onClick={onLoading}
        >
          Load more
        </button>
      </div>
    </div>
  );
}
