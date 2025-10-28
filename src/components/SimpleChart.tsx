import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// TypeScript Interfaces
interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface CategoryData {
  name: string;
  value: number;
}

type ChartType = "line" | "bar" | "pie" | "scatter";

// Sample Data
const monthlyData: MonthlyData[] = [
  { month: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { month: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
  { month: "Mar", revenue: 2000, expenses: 9800, profit: -7800 },
  { month: "Apr", revenue: 2780, expenses: 3908, profit: -1128 },
  { month: "May", revenue: 1890, expenses: 4800, profit: -2910 },
  { month: "Jun", revenue: 2390, expenses: 3800, profit: -1410 },
  { month: "Jul", revenue: 3490, expenses: 4300, profit: -810 },
  { month: "Aug", revenue: 4200, expenses: 2100, profit: 2100 },
  { month: "Sep", revenue: 3800, expenses: 2800, profit: 1000 },
  { month: "Oct", revenue: 4500, expenses: 2200, profit: 2300 },
  { month: "Nov", revenue: 5200, expenses: 2600, profit: 2600 },
  { month: "Dec", revenue: 6000, expenses: 3000, profit: 3000 },
];

const categoryData: CategoryData[] = [
  { name: "Electronics", value: 35000 },
  { name: "Clothing", value: 28000 },
  { name: "Food", value: 42000 },
  { name: "Books", value: 15000 },
  { name: "Home", value: 23000 },
];

// Color palettes
const COLORS = ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];
const LINE_COLORS = {
  revenue: "#10b981",
  expenses: "#ef4444",
  profit: "#3b82f6",
};

const SimpleChart: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<ChartType>("line");

  // Data validation
  const isDataValid = (data: any[]): boolean => {
    return Array.isArray(data) && data.length > 0;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}:{" "}
              {typeof entry.value === "number"
                ? `$${entry.value.toLocaleString()}`
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Chart renderers
  const renderLineChart = () => {
    if (!isDataValid(monthlyData)) {
      return <ErrorMessage />;
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={monthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke={LINE_COLORS.revenue}
            strokeWidth={3}
            dot={{ fill: LINE_COLORS.revenue, r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke={LINE_COLORS.expenses}
            strokeWidth={3}
            dot={{ fill: LINE_COLORS.expenses, r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke={LINE_COLORS.profit}
            strokeWidth={3}
            dot={{ fill: LINE_COLORS.profit, r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderBarChart = () => {
    if (!isDataValid(categoryData)) {
      return <ErrorMessage />;
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={categoryData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="value" name="Sales" radius={[8, 8, 0, 0]}>
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderPieChart = () => {
    if (!isDataValid(categoryData)) {
      return <ErrorMessage />;
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const renderScatterChart = () => {
    if (!isDataValid(monthlyData)) {
      return <ErrorMessage />;
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            dataKey="revenue"
            name="Revenue"
            stroke="#6b7280"
          />
          <YAxis
            type="number"
            dataKey="profit"
            name="Profit"
            stroke="#6b7280"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Legend />
          <Scatter name="Revenue vs Profit" data={monthlyData} fill="#8b5cf6" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  };

  const ErrorMessage: React.FC = () => (
    <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg border-2 border-red-200">
      <div className="text-center p-6">
        <svg
          className="w-16 h-16 text-red-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Data Error</h3>
        <p className="text-red-600">
          No valid data available to display the chart.
        </p>
      </div>
    </div>
  );

  const renderChart = () => {
    switch (selectedChart) {
      case "line":
        return renderLineChart();
      case "bar":
        return renderBarChart();
      case "pie":
        return renderPieChart();
      case "scatter":
        return renderScatterChart();
      default:
        return <ErrorMessage />;
    }
  };

  const chartButtons: { type: ChartType; label: string; icon: string }[] = [
    { type: "line", label: "Line Chart", icon: "📈" },
    { type: "bar", label: "Bar Chart", icon: "📊" },
    { type: "pie", label: "Pie Chart", icon: "🥧" },
    { type: "scatter", label: "Scatter Plot", icon: "⚫" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Interactive Dashboard
          </h1>
          <p className="text-gray-600">
            Visualize your data with multiple chart types
          </p>
        </div>

        {/* Chart Type Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Select Chart Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chartButtons.map(({ type, label, icon }) => (
              <button
                key={type}
                onClick={() => setSelectedChart(type)}
                className={`p-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                  selectedChart === type
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-2xl block mb-1">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Display */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {chartButtons.find((b) => b.type === selectedChart)?.label}
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live Data</span>
            </div>
          </div>
          {renderChart()}
        </div>

        {/* Data Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              📅 Monthly Data
            </h3>
            <p className="text-sm text-gray-600">
              {monthlyData.length} months of financial data
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              🏷️ Category Data
            </h3>
            <p className="text-sm text-gray-600">
              {categoryData.length} product categories tracked
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleChart;
