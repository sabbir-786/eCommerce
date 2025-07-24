import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCategories,
    createCategory,
    deleteCategory,
} from "@/store/categorySlice";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

function AdminCategoryManager() {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.category);
    const [input, setInput] = useState("");

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCreate = (e) => {
        e.preventDefault();
        if (!input.trim()) return toast.error("Category name cannot be empty");
        dispatch(createCategory(input));
        setInput("");
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            dispatch(deleteCategory(id));
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto mt-10">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                    Manage Categories
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCreate} className="flex gap-2 mb-4">
                    <Input
                        placeholder="New Category Name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit">Add</Button>
                </form>

                {loading && (
                    <p className="text-sm text-muted-foreground">Loading...</p>
                )}
                {error && (
                    <p className="text-sm text-destructive">Error: {error}</p>
                )}

                <ScrollArea className="h-64 pr-2 border rounded-md p-2">
                    <ul className="space-y-2">
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((item) => (
                                <li
                                    key={item._id}
                                    className="flex justify-between items-center border p-3 rounded-md"
                                >
                                    <span className="text-sm font-medium">
                                        {item.name}
                                    </span>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </li>
                            ))
                        ) : (
                            <p className="text-muted-foreground">
                                No categories found.
                            </p>
                        )}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

export default AdminCategoryManager;
