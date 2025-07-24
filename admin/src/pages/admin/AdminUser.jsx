import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Button
} from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
    Input
} from "@/components/ui/input";
import {
    Badge
} from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pencil,
    Trash,
    Lock,
    Unlock,
    KeyRound,
    Search,
    MoreHorizontal,
    Users,
    Filter,
    Download,
    Plus,
    Mail,
    Phone,
    Calendar,
    Shield,
    ShieldCheck,
    Eye,
} from "lucide-react";
import {
    blockUnblockUser,
    deleteAdminUser,
    fetchAdminUsers,
    resetAdminUserPassword,
} from "@/store/adminUserSlice";

function AdminUsers() {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.adminUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [resetUserId, setResetUserId] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        dispatch(fetchAdminUsers());
    }, [dispatch]);

    const handleDeleteUser = () => {
        if (deleteUserId) {
            dispatch(deleteAdminUser(deleteUserId));
            setDeleteUserId(null);
        }
    };

    const handleResetPassword = () => {
        if (resetUserId) {
            dispatch(resetAdminUserPassword(resetUserId));
            setResetUserId(null);
        }
    };

    const handleBlockToggle = (userId, isBlocked) => {
        dispatch(blockUnblockUser({ userId, block: !isBlocked }));
    };

    const filteredUsers = users?.filter((user) => {
        const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" ||
            (filterStatus === "active" && !user.isBlocked) ||
            (filterStatus === "blocked" && user.isBlocked);
        return matchesSearch && matchesFilter;
    });

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const activeUsers = users?.filter(user => !user.isBlocked).length || 0;
    const blockedUsers = users?.filter(user => user.isBlocked).length || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            User Management
                        </h1>
                        <p className="text-gray-600 mt-1">Manage and monitor user accounts</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all">
                            <Plus className="w-4 h-4 mr-2" />
                            Add User
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                                    <p className="text-2xl font-bold text-gray-900">{users?.length || 0}</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                                    <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-full">
                                    <ShieldCheck className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Blocked Users</p>
                                    <p className="text-2xl font-bold text-red-600">{blockedUsers}</p>
                                </div>
                                <div className="p-3 bg-red-100 rounded-full">
                                    <Shield className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                    <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <CardTitle className="text-xl font-semibold text-gray-800">
                                Users Directory
                            </CardTitle>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <div className="relative flex-1 sm:flex-initial">
                                    <Input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 w-full sm:w-80 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                    />
                                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filter
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-40">
                                        <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                                            All Users
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setFilterStatus("active")}>
                                            Active Only
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setFilterStatus("blocked")}>
                                            Blocked Only
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50">
                                    <TableHead className="font-semibold text-gray-700">User</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Contact</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Joined</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers?.map((user) => (
                                    <TableRow key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    {user.avatarUrl ? (
                                                        <img
                                                            src={user.avatarUrl}
                                                            alt={user.userName}
                                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                                            {getInitials(user.userName)}
                                                        </div>
                                                    )}
                                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.isBlocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{user.userName}</div>
                                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone className="w-3 h-3" />
                                                    {user.phone || "—"}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={user.isBlocked ? "destructive" : "default"}
                                                className={`${user.isBlocked
                                                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                                                        : "bg-green-100 text-green-700 hover:bg-green-200"
                                                    } font-medium`}
                                            >
                                                {user.isBlocked ? "Blocked" : "Active"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(user.createdAt || Date.now())}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-600"
                                                    onClick={() => setResetUserId(user._id)}
                                                >
                                                    <KeyRound className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className={`h-8 w-8 p-0 ${user.isBlocked
                                                            ? "hover:bg-green-100 hover:text-green-600"
                                                            : "hover:bg-yellow-100 hover:text-yellow-600"
                                                        }`}
                                                    onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                                                >
                                                    {user.isBlocked ? (
                                                        <Unlock className="w-4 h-4" />
                                                    ) : (
                                                        <Lock className="w-4 h-4" />
                                                    )}
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 hover:bg-gray-100"
                                                        >
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <div
                                                                        className="flex items-center w-full cursor-pointer"
                                                                        onClick={() => setDeleteUserId(user._id)}
                                                                    >
                                                                        <Trash className="w-4 h-4 mr-2" />
                                                                        Delete User
                                                                    </div>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent className="bg-white/95 backdrop-blur-sm">
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This action cannot be undone. Are you sure you want to delete this user?
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={handleDeleteUser}
                                                                            className="bg-red-600 hover:bg-red-700"
                                                                        >
                                                                            Delete
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {filteredUsers?.length === 0 && (
                            <div className="text-center py-16">
                                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Reset Password Dialog */}
                <AlertDialog
                    open={!!resetUserId}
                    onOpenChange={(open) => !open && setResetUserId(null)}
                >
                    <AlertDialogContent className="bg-white/95 backdrop-blur-sm">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Reset Password</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to reset this user's password? They will need to set a new password.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleResetPassword}
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                Reset Password
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

export default AdminUsers;