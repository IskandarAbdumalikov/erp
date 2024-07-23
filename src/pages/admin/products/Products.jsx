import React, { useState } from "react";
import "./products.scss";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../../context/productsApi";
import {
  useGetSellersBySearchQuery,
  useGetSingleSellerQuery,
} from "../../../context/sellerApi";
import CreateProductModule from "./CreateProductModule";

const Products = () => {
  const [value, setValue] = useState("");
  const [sellerId, setSellerId] = useState("");
  const { data: sellersData } = useGetSellersBySearchQuery({ value });
  const [showCreateModule, setShowCreateModule] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const { data: singleData } = useGetSingleSellerQuery(sellerId);
  let singleSeller = singleData?.innerData;

  const { data } = useGetProductsQuery();
  const handleClose = (id) => {
    setValue("");
    setSellerId(id);
  };

  const handleCreateProduct = (productData) => {
    createProduct(productData);
    setShowCreateModule(false);
  };

  const handleCancel = () => {
    setValue("");
    setSellerId("");
  };

  return (
    <div className="products">
      {sellerId ? (
        <div className="products__header">
          <ul>
            <li>
              <p>FIO</p>
              <h3>
                {singleSeller?.fname} {singleSeller?.lname}
              </h3>
            </li>
            <li>
              <p>Address</p>
              <h3>{singleSeller?.address}</h3>
            </li>
          </ul>
          <ul>
            <li>
              <p>Budget</p>
              <h3>{singleSeller?.budget} UZS</h3>
            </li>
            <li>
              <p>Phone number</p>
              <h3>{singleSeller?.phone_primary}</h3>
            </li>
          </ul>
          <ul>
            <button onClick={() => handleCancel()}>Cancel</button>
          </ul>
        </div>
      ) : (
        <></>
      )}
      {!sellerId ? (
        <form action="">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Search seller..."
          />
        </form>
      ) : (
        <></>
      )}
      {value ? (
        sellersData?.innerData?.map((seller) => (
          <div className="seller-card" key={seller._id}>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleClose(seller._id)}
            >
              {seller?.fname} {seller?.lname}
            </p>
          </div>
        ))
      ) : (
        <></>
      )}

      {sellerId ? (
        <div className="product-list">
          {data?.innerData
            ?.filter((el) => el.sellerId._id === sellerId)
            .map((el) => (
              <div className="product-card" key={el._id}>
                <h3>{el.title}</h3>
                <p>Price: {el.price} UZS</p>
                <p>Quantity: {el.quantity}</p>
                <p>Category: {el.category}</p>
                <p>
                  Seller: {el.sellerId.fname} {el.sellerId.lname}
                </p>
              </div>
            ))}
          <button onClick={() => setShowCreateModule(true)}>
            Create product
          </button>
        </div>
      ) : (
        <></>
      )}
      {showCreateModule ? (
        <CreateProductModule
          setShowCreateModule={setShowCreateModule}
          onSubmit={handleCreateProduct}
          sellerId={sellerId}
        />
      ) : (
        <></>
      )}
      {showCreateModule ? (
        <div
          className="overlay"
          onClick={() => setShowCreateModule(false)}
        ></div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Products;
