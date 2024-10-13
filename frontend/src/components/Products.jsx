import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { getProductsList } from "../services/Apis";

export const Products = () => {
  const [productList, setProductList] = useState([]);

  const fetchProducts = () => {
    getProductsList()
      .then((response) => {
        console.log(response.data);
        setProductList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (productList.length < 1) {
    return (
      <div className="w-full flex justify-center place-items-center">
        loading...
      </div>
    );
  } else {
    return (
      <div className="overflow-x-scroll w-full p-5">
        <Table className="">
          <Table.Head>
            <Table.HeadCell>Product Id</Table.HeadCell>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Product Price</Table.HeadCell>
            <Table.HeadCell>Product Image</Table.HeadCell>
            <Table.HeadCell>Product Quantity</Table.HeadCell>
            <Table.HeadCell>Product Description</Table.HeadCell>
            <Table.HeadCell>Product Availability</Table.HeadCell>
            <Table.HeadCell>Update Product</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {productList.map((product) => (
              <Table.Row key={product.i_id} className="bg-white">
                <Table.Cell>{product.i_id}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                  {product.i_name}
                </Table.Cell>
                <Table.Cell>{product.i_price}</Table.Cell>
                <Table.Cell>{product.i_image}</Table.Cell>
                <Table.Cell>{product.i_quantity}</Table.Cell>
                <Table.Cell>{product.i_description}</Table.Cell>
                <Table.Cell>
                  {product.i_avaliability === true ? "Yes" : "No"}
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline "
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
};
