import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { DollarSignIcon, ShoppingCartIcon, UsersIcon, PackageIcon } from 'lucide-react'
import { IoStatsChartSharp } from "react-icons/io5";

const salesData = [
  { category: 'Electronics', sales: 4000 },
  { category: 'Clothing', sales: 3000 },
  { category: 'Books', sales: 2000 },
  { category: 'Home', sales: 2780 },
  { category: 'Sports', sales: 1890 },
]

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
]

const recentOrders = [
  { id: '1', customer: 'John Doe', total: '$120.50', status: 'Completed' },
  { id: '2', customer: 'Jane Smith', total: '$75.20', status: 'Processing' },
  { id: '3', customer: 'Bob Johnson', total: '$200.00', status: 'Shipped' },
  { id: '4', customer: 'Alice Brown', total: '$50.75', status: 'Completed' },
  { id: '5', customer: 'Charlie Davis', total: '$180.30', status: 'Processing' },
]

function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

      {/* Summary divs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Total Revenue</div>
            <DollarSignIcon className="h-4 w-4 text-gray-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-gray-500">+20.1% from last month</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Orders</div>
            <ShoppingCartIcon className="h-4 w-4 text-gray-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-gray-500">+180.1% from last month</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Products</div>
            <PackageIcon className="h-4 w-4 text-gray-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-gray-500">+49 new products</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Active Users</div>
            <UsersIcon className="h-4 w-4 text-gray-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-gray-500">+201 since last hour</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-4 shadow-md">
          <div className="text-lg font-bold mb-4">Sales by Category</div>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 shadow-md">
          <div className="text-lg font-bold mb-4">Revenue Over Time</div>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function Orders() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800">Recent Orders</h2>
      <div className="bg-white p-4 shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.customer}</td>
                  <td className="border px-4 py-2">{order.total}</td>
                  <td className="border px-4 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function EcommerceAdminDashboard() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-3xl font-bold text-purple-600">E-com Admin</h1>
        </div>
        <nav className="mt-4 flex flex-col gap-3 px-1">
          <Link to="/">
            <button className="w-full hover:bg-black py-2 hover:text-white flex justify-center items-center">
              <IoStatsChartSharp className="mr-2 h-4 w-4" />
              <span className='text-xl font-medium'>Dashboard</span>
            </button>
          </Link>
          <Link to="/orders">
            <button className="w-full hover:bg-black py-2 hover:text-white flex justify-center items-center">
              <ShoppingCartIcon className="mr-2 h-4 w-4" />
              <span className='text-xl font-medium'>Orders</span>
            </button>
          </Link>

          <Link to="/">
            <button className="w-full hover:bg-black py-2 hover:text-white flex justify-center items-center">
              <IoStatsChartSharp className="mr-2 h-4 w-4" />
              <span className='text-xl font-medium'>Dashboard</span>
            </button>
          </Link>
          <Link to="/orders">
            <button className="w-full hover:bg-black py-2 hover:text-white flex justify-center items-center">
              <ShoppingCartIcon className="mr-2 h-4 w-4" />
              <span className='text-xl font-medium'>Orders</span>
            </button>
          </Link>

          

        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  )
}
