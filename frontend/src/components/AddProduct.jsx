import { FileInput, Label, TextInput, Textarea, Radio, Button, Select } from "flowbite-react";
import { useForm, Controller } from "react-hook-form"; // Import Controller
import { addProduct, getAllCategories } from "../services/Apis";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useEffect, useState } from "react";

export const AddProduct = () => {
  const { control, register, handleSubmit, reset } = useForm(); // Add reset method
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when the category changes
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId); // Update selected category state
    setSelectedSubcategory(""); // Reset selected subcategory when category changes
    try {
      const category = categories.find((cat) => cat.c_id === parseInt(categoryId));
      setSubcategories(category?.subCategories || []); // Set subcategories for the selected category
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

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
            i_category: selectedCategory, // Include selected category
            i_subcategory: selectedSubcategory, // Include selected subcategory
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

        {/* Category and Subcategory Selection (Side by Side) */}
        <div className="flex gap-6">
          {/* Category Selection */}
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="productCategory" value="Product Category" />
            </div>
            <Controller
              name="i_category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  id="productCategory"
                  {...field}
                  value={selectedCategory}
                  onChange={(e) => {
                    handleCategoryChange(e.target.value);
                    field.onChange(e.target.value); // Update react-hook-form state
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.c_id} value={category.c_id}>
                      {category.c_name}
                    </option>
                  ))}
                </Select>
              )}
            />
          </div>

          {/* Subcategory Selection */}
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="productSubcategory" value="Product Subcategory" />
            </div>
            <Controller
              name="i_subcategory"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  id="productSubcategory"
                  {...field}
                  value={selectedSubcategory}
                  onChange={(e) => {
                    setSelectedSubcategory(e.target.value);
                    field.onChange(e.target.value); // Update react-hook-form state
                  }}
                  disabled={!selectedCategory} // Disable if no category is selected
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.sc_id} value={subcategory.sc_id}>
                      {subcategory.sc_name}
                    </option>
                  ))}
                </Select>
              )}
            />
          </div>
        </div>

        {/* Other Form Fields */}
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

        {/* Product Price */}
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

        {/* Product Quantity */}
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

        {/* Product Description */}
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

        {/* Product Availability */}
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

        {/* Product Image Upload */}
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
