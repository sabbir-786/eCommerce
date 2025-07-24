import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/adminOrderSlice.js";
import { Eye, Edit, Trash2 } from "lucide-react";

const AdminOrdersView = () => {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("This Month");
    const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
    const dispatch = useDispatch();

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetailsForAdmin(getId));
    }

    useEffect(() => {
        dispatch(getAllOrdersForAdmin());
    }, [dispatch]);

    useEffect(() => {
        if (orderDetails !== null) setOpenDetailsDialog(true);
    }, [orderDetails]);

    const getStatusBadgeColor = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800 border-green-200";
            case "packaging":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "draft":
                return "bg-gray-100 text-gray-800 border-gray-200";
            case "canceled":
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200";
            case "confirmed":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "rejected":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getPaymentStatusBadgeColor = (status) => {
        switch (status?.toLowerCase()) {
            case "paid":
                return "bg-green-500 text-white";
            case "unpaid":
                return "bg-blue-500 text-white";
            case "refund":
                return "bg-orange-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    const getPriorityBadgeColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high":
                return "bg-red-100 text-red-800 border-red-200";
            case "normal":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "low":
                return "bg-gray-100 text-gray-800 border-gray-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    // Mock function to get customer name from order data
    const getCustomerName = (orderItem) => {
        return orderItem?.customerName || orderItem?.userId || "Unknown Customer";
    };

    // Mock function to get priority from order data
    const getPriority = (orderItem) => {
        return orderItem?.priority || "Normal";
    };

    // Mock function to get payment status
    const getPaymentStatus = (orderItem) => {
        return orderItem?.paymentStatus || "Unpaid";
    };

    // Mock function to get delivery number
    const getDeliveryNumber = (orderItem) => {
        return orderItem?.deliveryNumber || "-";
    };

    // Mock function to get items count
    const getItemsCount = (orderItem) => {
        return orderItem?.cartItems?.length || orderItem?.itemsCount || 0;
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800">All Order List</CardTitle>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="This Month">This Month</SelectItem>
                        <SelectItem value="Last Month">Last Month</SelectItem>
                        <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                        <SelectItem value="This Year">This Year</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="border-b">
                            <TableHead className="text-gray-600 font-medium">Order ID</TableHead>
                            <TableHead className="text-gray-600 font-medium">Created at</TableHead>
                            <TableHead className="text-gray-600 font-medium">Customer</TableHead>
                            <TableHead className="text-gray-600 font-medium">Priority</TableHead>
                            <TableHead className="text-gray-600 font-medium">Total</TableHead>
                            <TableHead className="text-gray-600 font-medium">Payment Status</TableHead>
                            <TableHead className="text-gray-600 font-medium">Items</TableHead>
                            <TableHead className="text-gray-600 font-medium">Delivery Number</TableHead>
                            <TableHead className="text-gray-600 font-medium">Order Status</TableHead>
                            <TableHead className="text-gray-600 font-medium">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderList && orderList.length > 0
                            ? orderList.map((orderItem) => (
                                <TableRow key={orderItem?._id} className="border-b hover:bg-gray-50">
                                    <TableCell className="font-medium text-blue-600">
                                        #{orderItem?._id?.slice(-8)}
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {new Date(orderItem?.orderDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="text-orange-600 font-medium">
                                        {getCustomerName(orderItem)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={`${getPriorityBadgeColor(getPriority(orderItem))} border`}
                                        >
                                            {getPriority(orderItem)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        ${orderItem?.totalAmount}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`${getPaymentStatusBadgeColor(getPaymentStatus(orderItem))} px-3 py-1 rounded-full`}
                                        >
                                            {getPaymentStatus(orderItem)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {getItemsCount(orderItem)}
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {getDeliveryNumber(orderItem)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={`${getStatusBadgeColor(orderItem?.orderStatus)} border px-3 py-1 rounded-full`}
                                        >
                                            {orderItem?.orderStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleFetchOrderDetails(orderItem?._id)}
                                                className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-gray-500 hover:text-orange-600"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                            : (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                                        No orders found
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>

                <Dialog
                    open={openDetailsDialog}
                    onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                    }}
                >
                    <AdminOrderDetailsView orderDetails={orderDetails} />
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default AdminOrdersView;