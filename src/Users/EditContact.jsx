/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

export default function EditContact({
  userId,
  user,
  setUser,
  formEdit,
  showFormEdit,
}) {
  const [disable, setDisable] = useState(true);
  const inititalValue = {
    email: user.email,
    phone: user.phone,
    website: user.website,
  }
  const [formData, setFormData] = useState(inititalValue);

  const onEdit = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((responseData) => setUser({ ...user, ...responseData }))
      .then(() => showFormEdit(false))
      .catch((error) => console.log(error));
  };
  const handleChange = (e) => {
    // eslint-disable-next-line no-debugger
    debugger
    const { name, value } = e.target;
    const updateFormData = {...formData, [name]: value}
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setFormData((prev) => ({ ...prev, [name]: value }));
    // giữ nguyên những term cũ và cập nhật term mới
    if (updateFormData[name] !== inititalValue[name]) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="email"
          // eslint-disable-next-line react/prop-types
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Phone:
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Website:
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        onClick={(e) => onEdit(e)}
        className="btn btn-success me-2"
        disabled={disable}
      >
        Submit
      </button>
      <button type="button" className="btn btn-danger">
        Reset
      </button>
    </div>
  );
}
