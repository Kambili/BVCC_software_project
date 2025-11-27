// src/components/SavedInsights.tsx
import { useState, useEffect } from "react";
import { Star, X, Sparkles } from "lucide-react";
import {
  getSavedInsights,
  removeSavedInsight,
  SavedInsight,
} from "@/utils/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SavedInsightsProps {
  onInsightClick?: (insight: SavedInsight) => void;
  onRefresh?: () => void;
}

const SavedInsights = ({
  onInsightClick,
  onRefresh,
}: SavedInsightsProps) => {
  const [savedInsights, setSavedInsights] = useState<SavedInsight[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const loadInsights = () => {
    setSavedInsights(getSavedInsights());
  };

  useEffect(() => {
    loadInsights();
  }, []);

  // Refresh when parent tells us to
  useEffect(() => {
    const handleUpdate = () => {
      loadInsights();
    };

    window.addEventListener("insightsUpdated", handleUpdate);
    return () => window.removeEventListener("insightsUpdated", handleUpdate);
  }, []);

  const handleRemove = (insightId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    removeSavedInsight(insightId);
    loadInsights();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle
            className="text-sm font-semibold flex items-center gap-2 cursor-pointer dark:text-white"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            Saved Insights
            <span className="text-xs text-gray-500">
              {isExpanded ? "▼" : "▶"}
            </span>
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {savedInsights.length}
          </Badge>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          {savedInsights.length === 0 ? (
            <div className="text-center py-6">
              <Sparkles className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No saved insights yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Star insights to save them here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedInsights.map((insight) => (
                <div
                  key={insight.id}
                  onClick={() => onInsightClick?.(insight)}
                  className="group relative p-3 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/50 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {insight.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {insight.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}
                        </Badge>
                        {insight.column && (
                          <Badge variant="secondary" className="text-xs">
                            {insight.column}
                          </Badge>
                        )}
                        {insight.fileName && ( // 🔥 NEW - show which file
                          <Badge
                            variant="default"
                            className="text-xs bg-blue-100 text-blue-800"
                          >
                            📄 {insight.fileName}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-400">
                          {formatDate(insight.savedAt)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleRemove(insight.id, e)}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </Button>
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

export default SavedInsights;
