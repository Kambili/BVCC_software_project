// src/components/InsightsTab.tsx
import InsightsPanel from "./InsightsPanel";
import SavedInsights from "./savedinsight";
import { DataRow, DataInsight } from "@/types/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Star } from "lucide-react";

interface InsightsTabProps {
  data: DataRow[];
  insights: DataInsight[];
  fileName: string;
}

const InsightsTab = ({
  data,
  insights,
  fileName,
}: InsightsTabProps) => {
  return (
    <Tabs
      defaultValue="generated"
      className="space-y-4 dark:text-white"
    >
      <TabsList className="grid w-full grid-cols-2 dark:bg-gray-800 dark:border-gray-700">
        <TabsTrigger value="generated" className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4" />
          Generated Insights
        </TabsTrigger>
        <TabsTrigger value="saved" className="flex items-center gap-2">
          <Star className="h-4 w-4" />
          Saved Insights
        </TabsTrigger>
      </TabsList>
      <TabsContent value="generated">
        <InsightsPanel
          data={data}
          insights={insights}
          showAll
          fileName={fileName}
          onInsightSaved={() => {
            window.dispatchEvent(new Event("insightsUpdated"));
          }}
        />
      </TabsContent>
      <TabsContent value="saved">
        <SavedInsights
          onInsightClick={(insight) => {
            console.log("Viewing saved insight:", insight);
            // You could add logic here to highlight or navigate to the insight
          }}
        />
      </TabsContent>
    </Tabs>
  );
};

export default InsightsTab;
