import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
} from "recharts";
import { DataRow } from "@/types/data";
import { getDataSummary, getColumnValues } from "@/utils/dataAnalysis";

interface ChartSectionProps {
  data: DataRow[];
  showAll?: boolean;
}

// Define all color palettes
const COLOR_PALETTES = {
  blues: ["#1E40AF", "#3B82F6", "#60A5FA", "#93C5FD", "#DBEAFE", "#EFF6FF"],
  greens: ["#065F46", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5"],
  purples: ["#6B21A8", "#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE"],
  oranges: ["#C2410C", "#F59E0B", "#FBBF24", "#FCD34D", "#FDE68A", "#FEF3C7"],
  colorful: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"],
  grays: ["#1F2937", "#4B5563", "#6B7280", "#9CA3AF", "#D1D5DB", "#E5E7EB"],
  default: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"], // fallback
};

const ChartSection = ({ data, showAll = false }: ChartSectionProps) => {
  // STATE DECLARATIONS

  const userPalette = localStorage.getItem("chartPalette") || "colorful";
  const [currentPalette, setCurrentPalette] = useState<string>(() => {
    return localStorage.getItem("chartPalette") || "colorful";
  });
  const COLORS =
    COLOR_PALETTES[userPalette as keyof typeof COLOR_PALETTES] ||
    COLOR_PALETTES.default;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState<string[]>(() => {
    // Only load saved preferences for Charts tab (showAll=true)
    if (showAll) {
      const saved = localStorage.getItem("selectedCharts");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Error loading chart preferences:", e);
        }
      }
      return []; // Charts tab: start empty
    }
    // Overview tab: always show bar chart
    return ["bar"];
  });

  // Update selection when switching tabs
  useEffect(() => {
    if (!showAll) {
      // Overview tab: always show bar chart
      setSelectedCharts(["bar"]);
    } else {
      // Charts tab: load saved or start empty
      const saved = localStorage.getItem("selectedCharts");
      if (saved) {
        try {
          setSelectedCharts(JSON.parse(saved));
        } catch (e) {
          setSelectedCharts([]);
        }
      }
    }
  }, [showAll]);

  // COMPUTED VALUES
  const summary = useMemo(() => getDataSummary(data), [data]);

  const numericColumns = useMemo(() => {
    return Object.entries(summary.columnTypes)
      .filter(([_, type]) => type === "numeric")
      .map(([column]) => column)
      .slice(0, showAll ? 10 : 2);
  }, [summary, showAll]);

  const chartData = useMemo(() => {
    if (numericColumns.length === 0) return [];

    return data.slice(0, 20).map((row, index) => {
      const item: any = { name: `Row ${index + 1}` };
      numericColumns.forEach((col) => {
        item[col] = typeof row[col] === "number" ? row[col] : 0;
      });
      return item;
    });
  }, [data, numericColumns]);

  // SIDE EFFECTS - Loading simulation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [data, selectedCharts]);

  // HANDLER FUNCTIONS
  const toggleChart = (chartType: string) => {
    setSelectedCharts((prev) => {
      const newSelection = prev.includes(chartType)
        ? prev.filter((type) => type !== chartType)
        : [...prev, chartType];

      // Save to localStorage
      localStorage.setItem("selectedCharts", JSON.stringify(newSelection));

      return newSelection;
    });
  };

  // Handler to change color palette
  const handlePaletteChange = (newPalette: string) => {
    setCurrentPalette(newPalette);
    localStorage.setItem("chartPalette", newPalette);

    // Trigger loading animation for smooth transition
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600);
  };

  // Palette options matching the welcome form
  const paletteOptions = [
    { name: "Cool Blues", value: "blues", emoji: "🔵" },
    { name: "Fresh Greens", value: "greens", emoji: "🟢" },
    { name: "Royal Purples", value: "purples", emoji: "🟣" },
    { name: "Warm Oranges", value: "oranges", emoji: "🟠" },
    { name: "Colorful Mix", value: "colorful", emoji: "🌈" },
    { name: "Professional Grays", value: "grays", emoji: "⚫" },
  ];

  // EARLY RETURN - No numeric columns
  if (numericColumns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Charts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No numeric columns found for visualization. Upload data with numeric
            values to see charts.
          </p>
        </CardContent>
      </Card>
    );
  }

  // CHART CONFIGURATION
  const availableCharts = [
    { type: "bar", title: "Bar Chart" },
    { type: "line", title: "Line Chart" },
    { type: "scatter", title: "Scatter Plot" },
    { type: "pie", title: "Distribution" },
  ];

  const charts = availableCharts.filter((chart) =>
    selectedCharts.includes(chart.type)
  );

  // MAIN RENDER
  return (
    <div className="space-y-6">
      {/* Chart Selection Panel */}
      {showAll && (
        <Card>
          <CardHeader>
            <CardTitle>Chart Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Color Palette Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Color Palette
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={currentPalette}
                    onChange={(e) => handlePaletteChange(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white dark:bg-gray-800 dark:text-white"
                  >
                    {paletteOptions.map((palette) => (
                      <option key={palette.value} value={palette.value}>
                        {palette.emoji} {palette.name}
                      </option>
                    ))}
                  </select>

                  {/* Color Preview */}
                  <div className="flex gap-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    {COLORS.slice(0, 6).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700"></div>

              {/* Chart Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select Charts to Display
                </label>
                <div className="flex flex-wrap gap-4">
                  {availableCharts.map(({ type, title }) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCharts.includes(type)}
                        onChange={() => toggleChart(type)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-2xl"></span>
                      <span className="font-medium">{title}</span>
                    </label>
                  ))}
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    const defaultSelection = ["bar", "line", "scatter", "pie"];
                    setSelectedCharts(defaultSelection);
                    localStorage.setItem(
                      "selectedCharts",
                      JSON.stringify(defaultSelection)
                    );
                  }}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Reset to All Charts
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedCharts.map((type) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading chart...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div
          className={`space-y-6 w-full overflow-x-hidden ${
            showAll ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : ""
          }`}
        >
          {charts.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <p className="text-center text-gray-500">
                  No charts selected. Please select at least one chart type
                  above.
                </p>
              </CardContent>
            </Card>
          ) : (
            charts.map(({ type, title }) => (
              <Card key={type}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full overflow-hidden">
                    <ResponsiveContainer width="100%" height="100%">
                      {type === "bar" ? (
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          {numericColumns.map((column, idx) => (
                            <Bar
                              key={column}
                              dataKey={column}
                              fill={COLORS[idx % COLORS.length]}
                            />
                          ))}
                        </BarChart>
                      ) : type === "line" ? (
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          {numericColumns.map((column, idx) => (
                            <Line
                              key={column}
                              type="monotone"
                              dataKey={column}
                              stroke={COLORS[idx % COLORS.length]}
                              strokeWidth={2}
                            />
                          ))}
                        </LineChart>
                      ) : type === "scatter" ? (
                        <ScatterChart>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            type="number"
                            dataKey={numericColumns[0]}
                            name={numericColumns[0]}
                          />
                          <YAxis
                            type="number"
                            dataKey={numericColumns[1] || numericColumns[0]}
                            name={numericColumns[1] || numericColumns[0]}
                          />
                          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                          <Scatter
                            name="Data Points"
                            data={chartData}
                            fill={COLORS[0]}
                          />
                        </ScatterChart>
                      ) : (
                        <PieChart>
                          <Pie
                            data={getColumnValues(data, numericColumns[0])
                              .slice(0, 6)
                              .map((value, index) => ({
                                name: `Item ${index + 1}`,
                                value,
                              }))}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label
                          >
                            {getColumnValues(data, numericColumns[0])
                              .slice(0, 6)
                              .map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ChartSection;
