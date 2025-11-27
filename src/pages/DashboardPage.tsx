import Dashboard from "@/components/Dashboard";
import AnalysisSidebar from "@/components/AnalysisSidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataRow } from "@/types/data";
import { RecentFile, getFileData } from "@/utils/storage";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, Heart, Github, Linkedin, Twitter } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

function DashboardPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [data, setData] = useState<DataRow[]>([]);
  const [fileName, setFileName] = useState("");

  // Load data from localStorage on mount
  useEffect(() => {
    const currentFileName = localStorage.getItem("currentFileName");
    if (currentFileName) {
      const savedData = getFileData(currentFileName);
      if (savedData && savedData.length > 0) {
        setData(savedData);
        setFileName(currentFileName);
        console.log("✅ Dashboard loaded:", currentFileName, savedData.length, "rows");
      } else {
        console.warn("❌ No data found for:", currentFileName);
      }
    }
  }, []);

  const handleReset = () => {
    setData([]);
    setFileName("");
    localStorage.removeItem("currentFileName");
    navigate("/index");
  };

  // Handle clicking a recent file from sidebar
  const handleRecentFileClick = (file: RecentFile) => {
    console.log("Opening recent file:", file);
    const savedData = getFileData(file.name);
    if (savedData && savedData.length > 0) {
      setData(savedData);
      setFileName(file.name);
      localStorage.setItem("currentFileName", file.name);
      console.log("✅ File reloaded:", file.name);
    } else {
      alert(
        `❌ Could not load data for: ${file.name}\n\nThe file data may have been cleared or is too large for storage.`
      );
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - only show when we have data */}
        {data.length > 0 && (
          <AnalysisSidebar onFileClick={handleRecentFileClick} />
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {data.length > 0 ? (
            <Dashboard data={data} fileName={fileName} onReset={handleReset} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No Data Loaded
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Upload a CSV file to begin analysis
                </p>
                <Button onClick={() => navigate("/index")} className="flex items-center gap-2 mx-auto">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Upload
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer Section */}
      <footer
        className={`backdrop-blur-sm border-t ${
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
}

export default DashboardPage;
