// ==========================================
// 🏠 WEEK 1: Index.tsx - Homepage Component
// ==========================================
// This is your main homepage! You will customize this in Week 1
// and add interactive components starting in Week 2.

// 📦 React imports - the core tools for building components
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 🎨 Icon imports - beautiful icons for your UI
import {
  Upload,
  BarChart3,
  TrendingUp,
  Database,
  Heart,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Brain,
  Zap,
} from "lucide-react";

// 🧩 UI Component imports - pre-built components for your interface
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 📊 Data-related imports - components that handle your data
import DataUpload from "@/components/DataUpload";
import { DataRow } from "@/types/data";
import UploadProgressSimulator from "@/components/UploadProgressSimulator";
import SimpleChart from "@/components/SimpleChart";
import DashboardPage from "./DashboardPage";
import Dashboard from "@/components/Dashboard";
import TypewriterText from "@/components/TypewriterText";
import AnalysisSidebar from "@/components/AnalysisSidebar";
import { addRecentFile, saveFileData, getFileData } from "@/utils/storage";
import { useTheme } from "@/contexts/ThemeContext";

// 🔧 WEEK 2: Import your UploadProgressSimulator component here
// 🔧 WEEK 3+: Additional imports will be added as you progress

const Index = () => {
  // 🧠 Component State - this is your component's memory!
  // useState lets your component remember and change data
  const navigate = useNavigate();
  const [data, setData] = useState<DataRow[]>([]); // Stores uploaded data
  const [fileName, setFileName] = useState<string>(""); // Remembers file name
  const [userName, setUserName] = useState<string>("");
  const { theme, toggleTheme } = useTheme(); // Use global theme context
  const [chartPalette, setChartPalette] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [step, setStep] = useState(1);
  const [insightsRefreshTrigger, setInsightsRefreshTrigger] = useState(0);
  const [showUpload, setShowUpload] = useState(true);

  useEffect(() => {
    const recentFiles = JSON.parse(localStorage.getItem("recentFiles") || "[]");
    if (recentFiles.length > 0) {
      // User has recent files, show them
      setShowUpload(false);
    }
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedPalette = localStorage.getItem("chartPalette");
    const savedUserType = localStorage.getItem("userType");

    if (savedName) setUserName(savedName);
    if (savedPalette) setChartPalette(savedPalette);
    if (savedUserType) setUserType(savedUserType);

    console.log("User preferences loaded:", {
      name: savedName,
      palette: savedPalette,
      type: savedUserType,
    });
  }, []);

  // 🔄 Event Handler - function that runs when data is uploaded
  const handleDataLoad = (loadedData: DataRow[], name: string) => {
    console.log("Data loaded:", loadedData.length, "rows");

    // 🔥 Save the actual data
    saveFileData(name, loadedData);

    // Track in recent files
    addRecentFile({
      id: `file-${Date.now()}`,
      name: name,
      rowCount: loadedData.length,
      columnCount: Object.keys(loadedData[0] || {}).length,
      uploadedAt: new Date().toISOString(),
    });

    // Store current file info for dashboard
    localStorage.setItem("currentFileName", name);

    // Navigate to dashboard page
    navigate("/dashboard");
  };

  // Handler to remove file from recent files
  // Function to delete a recent file
  const handleDeleteRecentFile = (fileId: string, fileName: string) => {
    // Get current recent files
    const recentFiles = JSON.parse(localStorage.getItem("recentFiles") || "[]");

    // Filter out the deleted file
    const updatedFiles = recentFiles.filter((file: any) => file.id !== fileId);

    // Save back to localStorage
    localStorage.setItem("recentFiles", JSON.stringify(updatedFiles));

    // Also delete the file data
    localStorage.removeItem(`fileData_${fileName}`);

    // Force re-render by toggling showUpload
    setShowUpload(true);
    setTimeout(() => setShowUpload(false), 0);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      }`}
    >
      {/* 🎨 Hero Section - The top part of your homepage */}
      <div className="container mx-auto px-4 max-w-full">
        {/* Theme Toggle - Top Right (only show when no data loaded) */}
        {data.length === 0 && (
          <div className="flex justify-end pt-4 mb-2">
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                theme === "dark"
                  ? "bg-blue-600 focus:ring-blue-500"
                  : "bg-gray-300 focus:ring-gray-400"
              }`}
              role="switch"
              aria-checked={theme === "dark"}
              title="Toggle theme"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  theme === "dark" ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        )}
        <div className="text-center mb-12 pt-8">
          {/* 🎯 Logo and Title */}
          <div className="flex items-center justify-center mb-6">
            <div
              className={`p-4 rounded-full ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600"
              }`}
            >
              <Database className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* 📝 WEEK 1: Students customize this title with their name */}
          <h1
            className={`text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-slate-800"
            }`}
          >
            {step >= 1 && (
              <TypewriterText
                text={`Plug-N-Learn: ${
                  userName ? `${userName}'s` : "Kambili's"
                } Dashboard`}
                speed={50}
                onComplete={() => setStep(2)}
              />
            )}
          </h1>

          <p
            className={`text-xl mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-slate-600"
            }`}
          >
            {step >= 2 && (
              <TypewriterText
                text="Data Insight Engine"
                speed={40}
                onComplete={() => setStep(3)}
              />
            )}
          </p>

          <p
            className={`text-lg max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-slate-500"
            }`}
          >
            {step >= 3 && (
              <TypewriterText
                text={
                  (userType === "student"
                    ? "Learn data analysis by uploading your dataset and exploring insights, trends, and visualizations."
                    : userType === "professional"
                    ? "Analyze your business data with powerful charts, insights, and analytics tools."
                    : userType === "researcher"
                    ? "Explore your research data with statistical insights and professional visualizations."
                    : userType === "exploring"
                    ? "Discover what your data reveals with easy-to-use charts and automated insights."
                    : "Upload your dataset and instantly discover insights, visualize trends, and explore your data with interactive charts and analytics.") +
                  (userName
                    ? ` Built by ${userName} - Top Software Engineer`
                    : "")
                }
                speed={25}
                onComplete={() => {}}
              />
            )}
          </p>
        </div>
        {data.length === 0 ? (
          <>
            {/* 🎨 Features Grid - Shows what your app can do */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* 📤 Upload Feature Card */}
              <Card
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800/70 backdrop-blur-sm"
                    : "bg-white/70 backdrop-blur-sm"
                }`}
              >
                <CardHeader className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle
                    className={`text-xl ${
                      theme === "dark" ? "text-white" : ""
                    }`}
                  >
                    Easy Data Upload
                  </CardTitle>
                  <CardDescription
                    className={theme === "dark" ? "text-gray-400" : ""}
                  >
                    Simply drag and drop your CSV files or click to browse.
                    Support for various data formats.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 📊 Charts Feature Card */}
              <Card
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800/70 backdrop-blur-sm"
                    : "bg-white/70 backdrop-blur-sm"
                }`}
              >
                <CardHeader className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-indigo-600" />
                  </div>
                  <CardTitle
                    className={`text-xl ${
                      theme === "dark" ? "text-white" : ""
                    }`}
                  >
                    Interactive Charts
                  </CardTitle>
                  <CardDescription
                    className={theme === "dark" ? "text-gray-400" : ""}
                  >
                    Automatically generate bar charts, line graphs, pie charts,
                    and more from your data.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 🧠 Insights Feature Card */}
              <Card
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800/70 backdrop-blur-sm"
                    : "bg-white/70 backdrop-blur-sm"
                }`}
              >
                <CardHeader className="text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-teal-600" />
                  </div>
                  <CardTitle
                    className={`text-xl ${
                      theme === "dark" ? "text-white" : ""
                    }`}
                  >
                    Smart Insights
                  </CardTitle>
                  <CardDescription
                    className={theme === "dark" ? "text-gray-400" : ""}
                  >
                    Discover patterns, trends, and statistical insights
                    automatically generated from your dataset.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </>
        ) : null}
      </div>

      {/* 🔧 WEEK 2: ADD YOUR PROGRESS COMPONENT HERE! */}
      {/* This is where students will add their UploadProgressSimulator component */}
      {/* Example: */}
      {!data.length ? (
        <>
          {showUpload ? (
            <Card
              className={`border-0 shadow-xl max-w-2xl mx-auto mb-8 ${
                theme === "dark"
                  ? "bg-gray-800/80 backdrop-blur-sm"
                  : "bg-white/80 backdrop-blur-sm"
              }`}
            >
              <CardHeader className="text-center">
                <CardTitle
                  className={`text-2xl ${
                    theme === "dark" ? "text-white" : ""
                  }`}
                >
                  Get Started
                </CardTitle>
                <CardDescription
                  className={theme === "dark" ? "text-gray-400" : ""}
                >
                  Upload your CSV file to begin exploring your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataUpload onDataLoad={handleDataLoad} />

                {/* Show Recent Files Button */}
                {JSON.parse(localStorage.getItem("recentFiles") || "[]")
                  .length > 0 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setShowUpload(false)}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                    >
                      Or view your recent files →
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card
              className={`border-0 shadow-xl max-w-4xl mx-auto mb-8 ${
                theme === "dark"
                  ? "bg-gray-800/80 backdrop-blur-sm"
                  : "bg-white/80 backdrop-blur-sm"
              }`}
            >
              <CardHeader className="text-center">
                <CardTitle
                  className={`text-2xl ${
                    theme === "dark" ? "text-white" : ""
                  }`}
                >
                  Your Recent Files
                </CardTitle>
                <CardDescription
                  className={theme === "dark" ? "text-gray-400" : ""}
                >
                  Click any file to open it
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Recent Files Grid */}
                <div className="grid gap-4 mb-4">
                  {JSON.parse(localStorage.getItem("recentFiles") || "[]")
                    .slice(0, 5)
                    .map((file: any) => (
                      <div
                        key={file.id}
                        className={`p-4 rounded-lg border transition-all hover:shadow-md relative group ${
                          theme === "dark"
                            ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                            : "bg-white border-gray-200 hover:border-blue-400"
                        }`}
                      >
                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              confirm(
                                `Delete "${file.name}" from recent files?`
                              )
                            ) {
                              handleDeleteRecentFile(file.id, file.name);
                            }
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                          title="Delete file"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {/* File Card - Clickable Area */}
                        <button
                          onClick={() => {
                            const savedData = getFileData(file.name);
                            if (savedData && savedData.length > 0) {
                              localStorage.setItem("currentFileName", file.name);
                              navigate("/dashboard");
                            } else {
                              alert(`Could not load data for: ${file.name}`);
                            }
                          }}
                          className="w-full text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3
                                className={`font-semibold ${
                                  theme === "dark"
                                    ? "text-white"
                                    : "text-gray-900"
                                }`}
                              >
                                {file.name}
                              </h3>
                              <p
                                className={`text-sm ${
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                                }`}
                              >
                                {file.rowCount} rows • {file.columnCount}{" "}
                                columns
                              </p>
                            </div>
                            <FileText className="h-8 w-8 text-blue-500" />
                          </div>
                        </button>
                      </div>
                    ))}
                </div>

                {/* Upload New File Button */}
                <button
                  onClick={() => setShowUpload(true)}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Upload New File
                </button>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
          <AnalysisSidebar
            onFileClick={(file) => {
              console.log("Opening recent file:", file);
              const savedData = getFileData(file.name);
              if (savedData && savedData.length > 0) {
                setData(savedData);
                setFileName(file.name);
                console.log("✅ File reloaded:", file.name);
              } else {
                alert(
                  `❌ Could not load data for: ${file.name}\n\nThe file data may have been cleared or is too large for storage.`
                );
              }
            }}
          />
          {/* Main Dashboard - Clean and simple */}
          <main className="flex-1">
            <Dashboard
              data={data}
              fileName={fileName}
              onReset={() => {
                setData([]);
                setFileName("");
              }}
            />
          </main>
        </div>
      )}

      {
        //<div className="mb-8">
        //<SimpleChart />
        //</div>
      }

      {
        //<div className="mb-8">
        //<DashboardPage />
        //</div>
      }

      {/* Footer Section */}
      <footer
        className={`backdrop-blur-sm border-t mt-auto ${
          theme === "dark"
            ? "bg-gray-800/80 border-gray-700/50"
            : "bg-white/80 border-slate-200/50"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* 👤 Name and Copyright Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-full">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p
                  className={`font-semibold ${
                    theme === "dark" ? "text-gray-200" : "text-slate-700"
                  }`}
                >
                  Kambili's Dashboard
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-slate-500"
                  }`}
                >
                  © {new Date().getFullYear()} Kambili. All rights reserved.
                </p>
              </div>
            </div>

            {/* 🔧 Built with React Section */}
            <div
              className={`flex items-center gap-2 ${
                theme === "dark" ? "text-gray-300" : "text-slate-600"
              }`}
            >
              <span className="text-sm">Built with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                React
              </span>
            </div>

            {/* 🔗 Social Media Links Section */}
            <div className="flex items-center gap-4">
              <span
                className={`text-sm hidden sm:block ${
                  theme === "dark" ? "text-gray-400" : "text-slate-500"
                }`}
              >
                Connect:
              </span>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 h-auto transition-colors ${
                    theme === "dark"
                      ? "hover:bg-gray-700 hover:text-blue-400"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  asChild
                >
                  <a
                    href="https://github.com/kambili"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 h-auto transition-colors ${
                    theme === "dark"
                      ? "hover:bg-gray-700 hover:text-blue-400"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  asChild
                >
                  <a
                    href="https://linkedin.com/in/kambili"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 h-auto transition-colors ${
                    theme === "dark"
                      ? "hover:bg-gray-700 hover:text-blue-400"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  asChild
                >
                  <a
                    href="https://twitter.com/kambili"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* 📱 Mobile-friendly divider and additional info */}
          <div
            className={`border-t mt-2 pt-2 text-center ${
              theme === "dark"
                ? "border-gray-700/50"
                : "border-slate-200/50"
            }`}
          >
            <p
              className={`text-xs ${
                theme === "dark" ? "text-gray-500" : "text-slate-400"
              }`}
            >
              Data Insight Engine • Empowering decisions through visualization
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
