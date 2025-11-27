import { useState } from "react";
import RecentFiles from "./recentfiles";
import { RecentFile } from "@/utils/storage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

interface AnalysisSidebarProps {
  onFileClick: (file: RecentFile) => void;
}

const AnalysisSidebar = ({ onFileClick }: AnalysisSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={`border-r border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 overflow-y-hidden h-full transition-all duration-300 relative ${
        isCollapsed ? "w-12" : "w-72"
      }`}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 right-2 z-10 h-8 w-8 p-0"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Sidebar Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4 pt-14">
          {/* Theme Toggle */}
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Theme
              </span>
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
          </div>

          <RecentFiles onFileClick={onFileClick} />
        </div>
      )}

      {/* Collapsed State - Show Icon Only */}
      {isCollapsed && (
        <div className="flex flex-col items-center pt-16 gap-4">
          <div className="text-gray-400 text-xs rotate-90 whitespace-nowrap"></div>
        </div>
      )}
    </aside>
  );
};

export default AnalysisSidebar;
