import {
  FileInput,
  Label,
  TextInput,
  Textarea,
  Radio,
  Button,
} from "flowbite-react";
import { useForm } from "react-hook-form";

export const AddProduct = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
            <Label htmlFor="productName" value="Product Name" />
          </div>
          <TextInput
            id="productName"
            type="text"
            sizing="md"
            {...register("productName")}
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
            {...register("productPrice")}
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
            {...register("productQuantity")}
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
            {...register("productDescription")}
          />
        </div>
        <fieldset
          className="flex max-w-md gap-4"
          {...register("productAvailability")}
        >
          <legend className="mb-4">Availablity</legend>
          <div className="flex items-center gap-2">
            <Radio id="yesOption" name="options" value="Yes" defaultChecked />
            <Label htmlFor="yesOption">Yes</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="noOption" name="options" value="No" />
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
            {...register("productImage")}
          />
        </div>
        <Button type="submit" color="dark">
          Add Product
        </Button>
      </form>
    </div>
  );
};
