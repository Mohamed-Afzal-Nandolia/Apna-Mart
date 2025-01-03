import {
  FileInput,
  Label,
  TextInput,
  Textarea,
  Radio,
  Button,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import { addProduct } from "../services/Apis";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

export const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm(); // Add reset method

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Convert the item object to JSON string before appending
    formData.append(
      "item",
      new Blob(
        [
          JSON.stringify({
            i_name: data.i_name,
            i_price: data.i_price,
            i_quantity: data.i_quantity,
            i_description: data.i_description,
            i_availability: data.i_availability,
          }),
        ],
        { type: "application/json" }
      )
    );

    formData.append("file", data.i_file[0]); // Ensure the file is correctly appended

    try {
      const response = await addProduct(formData);
      console.log(response.data);
      toast.success("Product added successfully!"); // Display success toast
      reset(); // Reset the form fields after success
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product. Please try again."); // Display error toast
    }
  };

  return (
    <div className="w-full h-auto flex flex-col place-items-center">
      <form
        className="w-auto flex flex-col gap-6 p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-bold text-4xl text-gray-900 px-20">
          Add new product
        </h2>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="productCategory" value="Product Category" />
          </div>
          <TextInput
            id="productCategory"
            type="text"
            sizing="md"
            {...register("i_category")}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="productName" value="Product Name" />
          </div>
          <TextInput
            id="productName"
            type="text"
            sizing="md"
            {...register("i_name")}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="productPrice" value="Product Price (Rs.)" />
          </div>
          <TextInput
            id="productPrice"
            type="text"
            sizing="md"
            {...register("i_price")}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="productQuantity" value="Quantity" />
          </div>
          <TextInput
            id="productQuantity"
            type="text"
            sizing="md"
            {...register("i_quantity")}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="large" value="Description" />
          </div>
          <Textarea
            id="large"
            rows={3}
            type="text"
            sizing="lg"
            {...register("i_description")}
          />
        </div>
        <fieldset
          className="flex max-w-md gap-4"
          {...register("i_availability")}
        >
          <legend className="mb-4">Availability</legend>
          <div className="flex items-center gap-2">
            <Radio id="yesOption" name="options" value={true} defaultChecked />
            <Label htmlFor="yesOption">Yes</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="noOption" name="options" value={false} />
            <Label htmlFor="noOption">No</Label>
          </div>
        </fieldset>
        <div id="fileUpload" className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload product image" />
          </div>
          <FileInput
            id="file"
            name="productIMG"
            helperText="file size should be less than 10MB"
            {...register("i_file")}
          />
        </div>
        <Button type="submit" color="dark">
          Add Product
        </Button>
      </form>
    </div>
  );
};
