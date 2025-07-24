import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Area,
    AreaChart,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    Users,
    DollarSign,
    RefreshCw,
    Settings,
    Bell,
    Calendar,
    Activity,
    Package,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    Filter,
    Download,
} from "lucide-react";
import { fetchAdminUsers } from "@/store/adminUserSlice";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

const salesData = [
    { name: "Jan", sales: 1200, revenue: 45000, orders: 120 },
    { name: "Feb", sales: 2100, revenue: 52000, orders: 180 },
    { name: "Mar", sales: 800, revenue: 38000, orders: 95 },
    { name: "Apr", sales: 1600, revenue: 48000, orders: 145 },
    { name: "May", sales: 2400, revenue: 62000, orders: 220 },
    { name: "Jun", sales: 2200, revenue: 58000, orders: 200 },
];

const orderStatusData = [
    { name: "Delivered", value: 45, color: "#10b981" },
    { name: "Shipped", value: 30, color: "#3b82f6" },
    { name: "Pending", value: 20, color: "#f59e0b" },
    { name: "Cancelled", value: 5, color: "#ef4444" },
];

const userGrowthData = [
    { month: "Jan", users: 20, active: 18 },
    { month: "Feb", users: 50, active: 45 },
    { month: "Mar", users: 30, active: 28 },
    { month: "Apr", users: 60, active: 55 },
    { month: "May", users: 90, active: 82 },
    { month: "Jun", users: 100, active: 95 },
];

const topProducts = [
    { name: "Premium Sneakers", sales: 300, revenue: 45000, growth: 12 },
    { name: "Designer Shirts", sales: 200, revenue: 32000, growth: 8 },
    { name: "Smart Watches", sales: 150, revenue: 28000, growth: -3 },
    { name: "Casual Hats", sales: 100, revenue: 15000, growth: 5 },
];

const recentActivities = [
    { id: 1, activity: "New order placed", user: "John Doe", time: "5 mins ago", type: "order", status: "success" },
    { id: 2, activity: "Product updated", user: "Admin", time: "1 hr ago", type: "product", status: "info" },
    { id: 3, activity: "User registered", user: "Jane Smith", time: "2 hrs ago", type: "user", status: "success" },
    { id: 4, activity: "Payment failed", user: "Mike Johnson", time: "3 hrs ago", type: "payment", status: "error" },
    { id: 5, activity: "Admin logged in", user: "Admin", time: "Today", type: "admin", status: "info" },
];

function AdminHome() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.adminUsers?.users || []);
    const userCount = users.length - 1;

    useEffect(() => {
        dispatch(fetchAdminUsers());
    }, [dispatch]);

    const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => (
        <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                        <div className="flex items-center mt-2">
                            {changeType === 'up' ? (
                                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                            ) : (
                                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                            )}
                            <span className={`text-sm font-medium ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {change}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">vs last month</span>
                        </div>
                    </div>
                    <div className={`p-3 rounded-full ${color}`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -mr-10 -mt-10 opacity-20 ${color}`}></div>
            </CardContent>
        </Card>
    );

    const ChartCard = ({ title, children, actions }) => (
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
                {actions && (
                    <div className="flex gap-2">
                        {actions}
                    </div>
                )}
            </CardHeader>
            <CardContent className="pt-4">
                {children}
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                            <Bell className="w-4 h-4 mr-2" />
                            Notifications
                        </Button>
                        <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Revenue"
                        value="₹52,000"
                        change="+12.5%"
                        changeType="up"
                        icon={DollarSign}
                        color="bg-gradient-to-r from-green-500 to-green-600"
                    />
                    <StatCard
                        title="Orders"
                        value="192"
                        change="+8.2%"
                        changeType="up"
                        icon={ShoppingCart}
                        color="bg-gradient-to-r from-blue-500 to-blue-600"
                    />
                    <StatCard
                        title="Users"
                        value={userCount}
                        change="+15.3%"
                        changeType="up"
                        icon={Users}
                        color="bg-gradient-to-r from-purple-500 to-purple-600"
                    />
                    <StatCard
                        title="Refunds"
                        value="₹3,200"
                        change="-5.4%"
                        changeType="down"
                        icon={RefreshCw}
                        color="bg-gradient-to-r from-red-500 to-red-600"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ChartCard
                        title="Revenue Overview"
                        actions={[
                            <Button key="filter" variant="ghost" size="sm">
                                <Filter className="w-4 h-4" />
                            </Button>
                        ]}
                    >
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        axisLine={{ stroke: '#e5e7eb' }}
                                    />
                                    <YAxis
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        axisLine={{ stroke: '#e5e7eb' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartCard>

                    <ChartCard title="Order Status Distribution">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={orderStatusData}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={100}
                                        innerRadius={60}
                                        paddingAngle={5}
                                    >
                                        {orderStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ChartCard title="User Growth Trend">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={userGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        axisLine={{ stroke: '#e5e7eb' }}
                                    />
                                    <YAxis
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        axisLine={{ stroke: '#e5e7eb' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="active" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartCard>

                    <ChartCard title="Top Products Performance">
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <Package className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-500">{product.sales} sales</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">₹{product.revenue.toLocaleString()}</p>
                                        <div className="flex items-center justify-end">
                                            {product.growth > 0 ? (
                                                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                                            )}
                                            <span className={`text-sm ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {product.growth > 0 ? '+' : ''}{product.growth}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ChartCard>
                </div>

                {/* Recent Activity */}
                <ChartCard
                    title="Recent Activity"
                    actions={[
                        <Button key="view-all" variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View All
                        </Button>
                    ]}
                >
                    <div className="space-y-4">
                        {recentActivities.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'success' ? 'bg-green-100' :
                                            item.status === 'error' ? 'bg-red-100' :
                                                'bg-blue-100'
                                        }`}>
                                        <Activity className={`w-5 h-5 ${item.status === 'success' ? 'text-green-600' :
                                                item.status === 'error' ? 'text-red-600' :
                                                    'text-blue-600'
                                            }`} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{item.activity}</p>
                                        <p className="text-sm text-gray-500">by {item.user}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="outline" className="bg-white/80">
                                        {item.time}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </ChartCard>
            </div>
        </div>
    );
}

export default AdminHome;