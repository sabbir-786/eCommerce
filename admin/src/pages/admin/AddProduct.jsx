import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "@/store/adminProductSlice";
import { fetchCategories, fetchBrand } from "@/store/categorySlice";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

function AddProduct() {
    const dispatch = useDispatch();
    const { categories, brands } = useSelector((state) => state.category);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        gender: "Male",
        brand: "",
        price: "",
        discountPrice: "",
        stock: "",
        images: [],
        rating: 0,
        reviews: [],
        colors: [],
        sizes: [],
    });

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBrand());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayInput = (e, field) => {
        const arr = e.target.value.split(",").map((item) => item.trim());
        setFormData({ ...formData, [field]: arr });
    };

    const handleImageUpload = async (e) => {
        const files = e.target.files;
        const uploaded = [];

        for (let file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary preset

            const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.secure_url) {
                uploaded.push(data.secure_url);
            }
        }

        setFormData((prev) => ({ ...prev, images: uploaded }));
        toast.success("Images uploaded");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.category || !formData.brand || !formData.price) {
            toast.error("Please fill required fields");
            return;
        }

        dispatch(addNewProduct(formData));
        toast.success("Product submitted!");
        setFormData({
            name: "",
            description: "",
            category: "",
            gender: "Male",
            brand: "",
            price: "",
            discountPrice: "",
            stock: "",
            images: [],
            rating: 0,
            reviews: [],
            colors: [],
            sizes: [],
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md"
        >
            <div>
                <Label>Name</Label>
                <Input name="name" value={formData.name} onChange={handleInputChange} />
            </div>

            <div>
                <Label>Description</Label>
                <Textarea name="description" value={formData.description} onChange={handleInputChange} />
            </div>

            <div>
                <Label>Category</Label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">Select Category</option>
                    {categories?.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <Label>Gender</Label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Kid">Kid</option>
                </select>
            </div>

            <div>
                <Label>Brand</Label>
                <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">Select Brand</option>
                    {brands?.map((brand) => (
                        <option key={brand._id} value={brand.name}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <Label>Price</Label>
                <Input type="number" name="price" value={formData.price} onChange={handleInputChange} />
            </div>

            <div>
                <Label>Discount Price</Label>
                <Input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <Label>Stock</Label>
                <Input type="number" name="stock" value={formData.stock} onChange={handleInputChange} />
            </div>

            <div>
                <Label>Rating</Label>
                <Input type="number" name="rating" value={formData.rating} onChange={handleInputChange} />
            </div>

            <div>
                <Label>Colors (comma separated)</Label>
                <Input
                    placeholder="e.g., red, blue, green"
                    onChange={(e) => handleArrayInput(e, "colors")}
                />
            </div>

            <div>
                <Label>Sizes (comma separated)</Label>
                <Input
                    placeholder="e.g., S, M, L, XL"
                    onChange={(e) => handleArrayInput(e, "sizes")}
                />
            </div>

            <div>
                <Label>Upload Images</Label>
                <Input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                {formData.images.length > 0 && (
                    <p className="text-xs text-green-600 mt-1">{formData.images.length} image(s) uploaded</p>
                )}
            </div>

            <Button type="submit" className="w-full">
                Add Product
            </Button>
        </form>
    );
}

export default AddProduct;
