// src/components/RecentFiles.tsx
import { useState, useEffect } from "react";
import { FileText, Clock, X } from "lucide-react";
import { getRecentFiles, clearRecentFiles, RecentFile } from "@/utils/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";
<FolderOpen className="h-5 w-5" />;
interface RecentFilesProps {
  onFileClick: (file: RecentFile) => void;
}

const RecentFiles = ({ onFileClick }: RecentFilesProps) => {
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setRecentFiles(getRecentFiles());
  }, []);

  const handleClearAll = () => {
    clearRecentFiles();
    setRecentFiles([]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle
            className="text-sm font-semibold flex items-center gap-2 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <FolderOpen className="h-5 w-5" />
            <span className="text-xs text-gray-500">
              {isExpanded ? "▼" : "▶"}
            </span>
          </CardTitle>
          {recentFiles.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="h-6 px-2 text-xs"
            >
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          {recentFiles.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No recent files
            </p>
          ) : (
            <div className="space-y-2">
              {recentFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => onFileClick(file)}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200"
                >
                  <FileText className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file.rowCount.toLocaleString()} rows • {file.columnCount}{" "}
                      cols
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatDate(file.uploadedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default RecentFiles;
