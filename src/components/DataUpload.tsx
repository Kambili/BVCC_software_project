// ==========================================
// 📤 WEEK 3: DataUpload.tsx - File Upload Component (Theme-Integrated)
// ==========================================
// This component handles CSV file uploads and supports parent-controlled theming

import { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataRow } from "@/types/data";

// 📋 Props interface
interface DataUploadProps {
  onDataLoad: (data: DataRow[], fileName: string) => void;
}

// 📊 Upload statistics interface
interface UploadStats {
  fileName: string;
  fileSize: string;
  rowCount: number;
  columnCount: number;
  processingTime: number;
}

const DataUpload = ({ onDataLoad }: DataUploadProps) => {
  // 🧠 Component state
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [stats, setStats] = useState<UploadStats | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      return "Please upload a CSV file (.csv extension required)";
    }
    if (file.size > 10 * 1024 * 1024) {
      return "File size too large. Please upload files smaller than 10MB";
    }
    if (file.size === 0) {
      return "File appears to be empty. Please upload a valid CSV file";
    }
    return null;
  };

  const parseCSV = (text: string): DataRow[] => {
    const lines = text.trim().split("\n");
    if (lines.length < 2) {
      throw new Error("CSV must have at least a header row and one data row");
    }

    const parseCSVLine = (line: string): string[] => {
      const result = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }

      result.push(current.trim());
      return result;
    };

    const headers = parseCSVLine(lines[0]).map((h) => h.replace(/^"|"$/g, ""));
    const data: DataRow[] = [];
    let validRows = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseCSVLine(line);

      if (values.length !== headers.length) {
        console.warn(
          `Row ${i + 1} has ${values.length} columns, expected ${
            headers.length
          }. Skipping.`
        );
        continue;
      }

      const row: DataRow = {};
      let hasData = false;

      headers.forEach((header, index) => {
        let value: string | number | boolean | null =
          values[index]?.replace(/^"|"$/g, "") || "";

        if (value !== "") hasData = true;

        if (
          value !== "" &&
          !isNaN(Number(value)) &&
          value !== "true" &&
          value !== "false"
        ) {
          const numValue = Number(value);
          if (Number.isFinite(numValue)) {
            value = numValue;
          }
        } else if (value.toLowerCase() === "true") {
          value = true;
        } else if (value.toLowerCase() === "false") {
          value = false;
        } else if (value === "") {
          value = null;
        }

        row[header] = value;
      });

      if (hasData) {
        data.push(row);
        validRows++;
      }
    }

    if (data.length === 0) {
      throw new Error("No valid data rows found in CSV file");
    }

    console.log(
      `Parsed ${validRows} valid rows from ${lines.length - 1} total rows`
    );
    return data;
  };

  const handleFile = async (file: File) => {
    const startTime = Date.now();

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const text = await file.text();
      const data = parseCSV(text);

      clearInterval(progressInterval);
      setUploadProgress(100);

      const processingTime = Date.now() - startTime;
      const uploadStats: UploadStats = {
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        rowCount: data.length,
        columnCount: Object.keys(data[0] || {}).length,
        processingTime,
      };

      setStats(uploadStats);

      setTimeout(() => {
        console.log("Upload successful:", uploadStats);
        onDataLoad(data, file.name);
      }, 500);
    } catch (err) {
      setUploadProgress(0);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to parse CSV file";
      setError(`Processing failed: ${errorMessage}`);
      console.error("CSV parsing error:", err);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 1) {
      setError("Please upload only one file at a time");
      return;
    }

    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
    e.target.value = "";
  };

  const clearError = () => setError(null);

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="ghost" size="sm" onClick={clearError}>
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {stats && !error && (
        <Alert className="dark:bg-green-900/20 dark:border-green-700">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium text-green-800 dark:text-green-200">
                Upload successful!
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Processed <strong>{stats.rowCount.toLocaleString()}</strong>{" "}
                rows and <strong>{stats.columnCount}</strong> columns from{" "}
                <strong>{stats.fileName}</strong> ({stats.fileSize}) in{" "}
                {stats.processingTime}ms
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Card className="dark:bg-gray-800/70 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 dark:text-white">
            <FileSpreadsheet className="h-6 w-6" />
            Upload Your Data
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Drop your CSV file here or click to browse. Maximum file size: 10MB
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isDragging
                ? "border-primary bg-primary/5 dark:border-blue-400 dark:bg-blue-500/10"
                : isLoading
                ? "border-muted bg-muted/20 dark:border-gray-600 dark:bg-gray-700/20"
                : "border-muted-foreground/25 hover:border-muted-foreground/50 dark:border-gray-600 dark:hover:border-gray-500"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 dark:bg-blue-500/20">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary dark:border-blue-400"></div>
                ) : (
                  <Upload
                    className={`h-8 w-8 ${
                      isDragging
                        ? "text-primary dark:text-blue-400"
                        : "text-primary/70 dark:text-blue-300"
                    }`}
                  />
                )}
              </div>

              <div>
                <p className="text-lg font-medium dark:text-white">
                  {isLoading
                    ? "Processing your file..."
                    : isDragging
                    ? "Drop your CSV file here"
                    : "Drop your CSV file here"}
                </p>
                <p className="text-sm mt-1 text-muted-foreground dark:text-gray-400">
                  {isLoading
                    ? "Please wait while we analyze your data"
                    : "or click to browse your files"}
                </p>
              </div>

              {isLoading && (
                <div className="w-full max-w-xs space-y-2">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    {uploadProgress < 90
                      ? "Reading file..."
                      : "Analyzing data..."}
                  </p>
                </div>
              )}

              {!isLoading && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("file-input")?.click()}
                  className="flex items-center space-x-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
                >
                  <FileText className="h-4 w-4" />
                  <span>Choose File</span>
                </Button>
              )}

              <input
                id="file-input"
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="hidden"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="text-xs text-center space-y-1 text-muted-foreground dark:text-gray-400">
              <p>
                <strong>Supported format:</strong> CSV files with headers in the
                first row
              </p>
              <p>
                <strong>File requirements:</strong> UTF-8 encoding,
                comma-separated values
              </p>
              <p>
                <strong>Data types:</strong> Numbers, text, booleans
                (true/false) automatically detected
              </p>
            </div>

            <div className="rounded-lg p-4 bg-muted/50 dark:bg-gray-700/50">
              <h4 className="text-sm font-medium mb-2 dark:text-white">
                Sample CSV Format:
              </h4>
              <pre className="text-xs font-mono text-muted-foreground dark:text-gray-300">
                {`Name,Age,Score,Active
John Doe,25,85.5,true
Jane Smith,30,92.0,false
Bob Johnson,28,78.5,true`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataUpload;
