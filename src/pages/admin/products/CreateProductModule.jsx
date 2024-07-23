import React, { useState } from "react";

const CreateProductModule = ({ onSubmit, sellerId, setShowCreateModule }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    units: "",
    quantity: "",
    category: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, sellerId });
  };

  return (
    <div className="module">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="units"
          placeholder="Units"
          value={formData.units}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
        />
        <button type="submit">Create Product</button>
        <button
          style={{ background: "red", borderColor: "red" }}
          type="button"
          onClick={() => setShowCreateModule(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateProductModule;
