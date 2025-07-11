import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSonner } from "sonner";

import ProductImageUpload from "@/components/admin/image-upload";
import AdminProductTile from "@/components/admin/product-tile";
import CommonForm from "@/components/form";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import {
    addNewProduct,
    deleteProduct,
    editProduct,
    fetchAllProducts,
} from "../store/productSlice";

import { addProductFormElements } from "@/config";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
};

function AdminProducts() {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);

    const { productList } = useSelector((state) => state.adminProducts);
    const dispatch = useDispatch();
    const { toast } = useSonner();

    function onSubmit(event) {
        event.preventDefault();

        currentEditedId !== null
            ? dispatch(editProduct({ id: currentEditedId, formData }))
                .then((data) => {
                    if (data?.payload?.success) {
                        dispatch(fetchAllProducts());
                        setFormData(initialFormData);
                        setOpenCreateProductsDialog(false);
                        setCurrentEditedId(null);
                        toast({ title: "✅ Product updated successfully." });
                    }
                })
            : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl }))
                .then((data) => {
                    if (data?.payload?.success) {
                        dispatch(fetchAllProducts());
                        setOpenCreateProductsDialog(false);
                        setImageFile(null);
                        setFormData(initialFormData);
                        toast({ title: "✅ Product added successfully." });
                    }
                });
    }

    function handleDelete(id) {
        dispatch(deleteProduct(id)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                toast({ title: "🗑️ Product deleted successfully." });
            }
        });
    }

    function isFormValid() {
        return Object.keys(formData)
            .filter((key) => key !== "averageReview")
            .every((key) => formData[key] !== "");
    }

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    return (
        <Fragment>
            <div className="mb-6 w-full flex justify-end">
                <Button
                    onClick={() => setOpenCreateProductsDialog(true)}
                    className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-300 text-white hover:opacity-90 shadow-lg"
                >
                    Add New Product
                </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {productList?.length > 0 &&
                    productList.map((productItem) => (
                        <AdminProductTile
                            key={productItem._id}
                            setFormData={setFormData}
                            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                            setCurrentEditedId={setCurrentEditedId}
                            product={productItem}
                            handleDelete={handleDelete}
                        />
                    ))}
            </div>

            <Sheet
                open={openCreateProductsDialog}
                onOpenChange={() => {
                    setOpenCreateProductsDialog(false);
                    setCurrentEditedId(null);
                    setFormData(initialFormData);
                }}
            >
                <SheetContent side="right" className="overflow-auto max-w-md w-full">
                    <SheetHeader>
                        <SheetTitle className="text-violet-700 text-xl font-bold">
                            {currentEditedId !== null ? "Edit Product" : "Add New Product"}
                        </SheetTitle>
                    </SheetHeader>

                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        isEditMode={currentEditedId !== null}
                    />

                    <div className="py-6 space-y-4">
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEditedId !== null ? "Update" : "Add"}
                            formControls={addProductFormElements}
                            isBtnDisabled={!isFormValid()}
                            btnClassName="w-full bg-gradient-to-r from-violet-700 via-purple-500 to-pink-300 text-white hover:opacity-90"
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;