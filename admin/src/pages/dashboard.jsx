import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4000 },
    { name: "May", sales: 6000 },
];

const ordersData = [
    { name: "Jan", orders: 200 },
    { name: "Feb", orders: 180 },
    { name: "Mar", orders: 250 },
    { name: "Apr", orders: 220 },
    { name: "May", orders: 300 },
];

const trafficSourceData = [
    { name: "Organic", value: 400 },
    { name: "Referral", value: 300 },
    { name: "Social", value: 300 },
    { name: "Email", value: 200 },
];

const COLORS = ["#7c3aed", "#6366f1", "#8b5cf6", "#a78bfa"];

const gradientCardClass = "bg-gradient-to-br from-[#2F1C53] via-[#A46DFF] to-[#F6D1FD] text-white shadow-xl";

function AdminDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6">
            <Card className={gradientCardClass}>
                <CardHeader>
                    <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-semibold">₹2,50,000</p>
                </CardContent>
            </Card>

            <Card className={gradientCardClass}>
                <CardHeader>
                    <CardTitle>Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-semibold">1,250</p>
                </CardContent>
            </Card>

            <Card className={gradientCardClass}>
                <CardHeader>
                    <CardTitle>New Customers</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-semibold">320</p>
                </CardContent>
            </Card>

            <Card className={gradientCardClass}>
                <CardHeader>
                    <CardTitle>Site Traffic</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-semibold">45k Visitors</p>
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle>Sales Trends</CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="#7c3aed" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle>Product Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ordersData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle>Traffic by Source</CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={trafficSourceData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {trafficSourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminDashboard;
