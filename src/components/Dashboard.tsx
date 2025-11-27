// ==========================================
// 📊 WEEK 4+: Dashboard.tsx - Main Data Visualization Component
// ==========================================
// This is the main dashboard that displays after data is uploaded
// Students will enhance this component throughout weeks 4-10

import { useState, useMemo } from "react";
import {
  RefreshCw,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  Table,
  MessageCircle,
  FileText,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataRow } from "@/types/data";
import DataTable from "./DataTable";
import ChartSection from "./ChartSection";
import InsightsPanel from "./InsightsPanel";
import ChatInterface from "./ChatInterface";
import { generateDataInsights, getDataSummary } from "@/utils/dataAnalysis";
import InsightsTab from "./InsightsTab";

// 🔧 WEEK 6: Import custom chart components here
// Example: import CustomChartBuilder from './CustomChartBuilder';

// 🔧 WEEK 8: Import personal data analysis components here
// Example: import PersonalAnalytics from './PersonalAnalytics';

// 🔧 WEEK 9: Import AI components here
// Example: import AIInsightGenerator from './AIInsightGenerator';

interface DashboardProps {
  data: DataRow[];
  fileName: string;
  onReset: () => void;
}

const Dashboard = ({
  data,
  fileName,
  onReset,
}: DashboardProps) => {
  // 🧠 Dashboard state management
  const [activeTab, setActiveTab] = useState("overview");

  // 🔧 WEEK 4: Add data processing state here
  // Example: const [filteredData, setFilteredData] = useState(data);

  // 🔧 WEEK 5: Add file handling state here
  // Example: const [exportFormat, setExportFormat] = useState('csv');

  // 🔧 WEEK 6: Add chart customization state here
  // Example: const [chartConfig, setChartConfig] = useState({});

  // 🔧 WEEK 7: Add API integration state here
  // Example: const [externalData, setExternalData] = useState([]);

  // 🔧 WEEK 8: Add personal analytics state here
  // Example: const [personalInsights, setPersonalInsights] = useState([]);

  // 🔧 WEEK 9: Add AI insights state here
  // Example: const [aiGeneratedInsights, setAiGeneratedInsights] = useState([]);

  // 📊 Computed values - these recalculate when data changes
  const summary = useMemo(() => getDataSummary(data), [data]);
  const [insights, setInsights] = useState<any[]>([]);
  const [insightsGenerated, setInsightsGenerated] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);

  const handleGenerateInsights = () => {
    setIsGeneratingInsights(true);

    // Simulate processing time for better UX
    setTimeout(() => {
      const generatedInsights = generateDataInsights(data);
      setInsights(generatedInsights);
      setInsightsGenerated(true);
      setIsGeneratingInsights(false);
    }, 1500); // 1.5 second delay
  };

  // Enhanced export functionality
  const handleExportCSV = () => {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            // Handle values that might contain commas or quotes
            if (
              typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
            ) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `processed_${fileName}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportInsights = () => {
    const reportContent = `Data Analysis Report
Generated: ${new Date().toLocaleDateString()}
Dataset: ${fileName}

DATASET SUMMARY
================
Total Rows: ${summary.totalRows.toLocaleString()}
Total Columns: ${summary.totalColumns}
Numeric Columns: ${summary.numericColumns}
Text Columns: ${summary.textColumns}

KEY INSIGHTS
=============
${insights
  .map(
    (insight, index) =>
      `${index + 1}. ${insight.title}
   ${insight.description}
   Confidence: ${insight.confidence}
   ${insight.column ? `Column: ${insight.column}` : ""}
`
  )
  .join("\n")}

MISSING DATA
=============
${
  Object.entries(summary.missingValues)
    .filter(([_, count]) => count > 0)
    .map(
      ([column, count]) =>
        `${column}: ${count} missing values (${(
          (count / summary.totalRows) *
          100
        ).toFixed(1)}%)`
    )
    .join("\n") || "No missing data detected"
}

COLUMN TYPES
=============
${Object.entries(summary.columnTypes)
  .map(([column, type]) => `${column}: ${type}`)
  .join("\n")}
`;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `insights_${fileName.replace(".csv", "")}_report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 pb-20 max-w-full overflow-x-hidden dark:bg-gray-900">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Data Analysis Dashboard
          </h2>
          <div className="flex items-center gap-4 text-sm mt-1 text-gray-600 dark:text-gray-300">
            {" "}
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="font-semibold">{fileName}</span>
            </span>
            <span>{data.length.toLocaleString()} rows</span>
            <span>{Object.keys(data[0] || {}).length} columns</span>
            <span>{summary.numericColumns} numeric</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button
            variant="outline"
            onClick={handleExportInsights}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            New Dataset
          </Button>
        </div>
      </div>
      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Total Records
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-800 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">
              {summary.totalRows.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">rows of data</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-400">
              Data Columns
            </CardTitle>
            <Table className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-300">
              {summary.totalColumns}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">total fields</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 dark:border-purple-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-400">
              Numeric Fields
            </CardTitle>
            <LineChart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-300">
              {summary.numericColumns}
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">for analysis</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 dark:border-orange-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-400">
              Data Quality
            </CardTitle>
            <PieChart className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-300">
              {Object.values(summary.missingValues).every(
                (count) => count === 0
              )
                ? "100%"
                : `${(
                    100 -
                    (Object.values(summary.missingValues).reduce(
                      (a, b) => a + b,
                      0
                    ) /
                      (summary.totalRows * summary.totalColumns)) *
                      100
                  ).toFixed(1)}%`}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">complete data</p>
          </CardContent>
        </Card>
      </div>
      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Charts</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Table className="h-4 w-4" />
            <span className="hidden sm:inline">Data</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ChartSection data={data} />
            </div>
            <div className="xl:col-span-1">
              {!insightsGenerated && !isGeneratingInsights ? (
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                      Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <p className="mb-4 text-gray-500 dark:text-gray-400">
                      Click below to generate AI-powered insights from your data
                    </p>
                    <Button onClick={handleGenerateInsights}>
                      Generate Insights
                    </Button>
                  </CardContent>
                </Card>
              ) : isGeneratingInsights ? (
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                      Generating Insights...
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-400"></div>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        Analyzing your data...
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        This may take a moment
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <InsightsPanel
                  data={data}
                  insights={insights.slice(0, 6)}
                  fileName={fileName}
                  onInsightSaved={() => {
                    window.dispatchEvent(new Event("insightsUpdated"));
                  }}
                />
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="charts">
          <ChartSection data={data} showAll />
        </TabsContent>

        <TabsContent value="insights">
          {!insightsGenerated && !isGeneratingInsights ? (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No insights generated yet. Click below to analyze your data.
                </p>
                <Button onClick={handleGenerateInsights} size="lg">
                  Generate Insights
                </Button>
              </CardContent>
            </Card>
          ) : isGeneratingInsights ? (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Generating Insights...
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Analyzing your data...
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Processing {data.length.toLocaleString()} rows across{" "}
                    {Object.keys(data[0] || {}).length} columns
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <InsightsTab
              data={data}
              insights={insights}
              fileName={fileName}
            />
          )}
        </TabsContent>

        <TabsContent value="chat">
          <ChatInterface data={data} />
        </TabsContent>

        <TabsContent value="data">
          <DataTable data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
