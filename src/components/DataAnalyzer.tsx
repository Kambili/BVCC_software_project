import { useState } from "react";
import { BarChart3, TrendingUp, AlertCircle } from "lucide-react";

const DataAnalyzer = () => {
  const [selectedDataset, setSelectedDataset] = useState("temperatures");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const datasets = {
    temperatures: [72, 75, 68, 80, 77, 74, 69, 78, 76, 73],
    testScores: [88, 92, 79, 95, 87, 90, 84, 89, 93, 86],
    salesFigures: [1200, 1450, 980, 1680, 1250, 1520, 1100, 1400],
  };

  const analyzeData = () => {
    setError("");
    setResults(null);

    const rawData = datasets[selectedDataset];

    // Filter out non-numeric values
    const validNumbers = rawData.filter(
      (val) => typeof val === "number" && !isNaN(val) && isFinite(val)
    );

    // Error handling for empty or invalid data
    if (!rawData || rawData.length === 0) {
      setError("Dataset is empty. Please select a valid dataset.");
      return;
    }

    if (validNumbers.length === 0) {
      setError("No valid numeric values found in the dataset.");
      return;
    }

    // Calculate statistics
    const sum = validNumbers.reduce((acc, val) => acc + val, 0);
    const count = validNumbers.length;
    const average = sum / count;
    const min = Math.min(...validNumbers);
    const max = Math.max(...validNumbers);
    const range = max - min;

    // Calculate median
    const sorted = [...validNumbers].sort((a, b) => a - b);
    const median =
      count % 2 === 0
        ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
        : sorted[Math.floor(count / 2)];

    setResults({
      sum: sum.toFixed(2),
      average: average.toFixed(2),
      minimum: min,
      maximum: max,
      count,
      median: median.toFixed(2),
      range: range.toFixed(2),
    });
  };

  const getDatasetLabel = (key) => {
    const labels = {
      temperatures: "Temperatures (°F)",
      testScores: "Test Scores",
      salesFigures: "Sales Figures ($)",
    };
    return labels[key] || key;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Data Analyzer</h1>
          </div>

          {/* Dataset Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Dataset
            </label>
            <select
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
            >
              {Object.keys(datasets).map((key) => (
                <option key={key} value={key}>
                  {getDatasetLabel(key)}
                </option>
              ))}
            </select>
          </div>

          {/* Data Preview */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Data Preview:
            </p>
            <p className="text-gray-600 font-mono text-sm">
              [{datasets[selectedDataset].join(", ")}]
            </p>
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyzeData}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <TrendingUp className="w-5 h-5" />
            Analyze Data
          </button>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Results Display */}
          {results && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Analysis Results
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Sum", value: results.sum, color: "blue" },
                  { label: "Average", value: results.average, color: "green" },
                  { label: "Minimum", value: results.minimum, color: "purple" },
                  { label: "Maximum", value: results.maximum, color: "orange" },
                  { label: "Count", value: results.count, color: "pink" },
                  { label: "Median", value: results.median, color: "indigo" },
                  { label: "Range", value: results.range, color: "teal" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-${stat.color}-50 p-4 rounded-lg border-2 border-${stat.color}-200`}
                  >
                    <p
                      className={`text-xs font-semibold text-${stat.color}-600 uppercase tracking-wide mb-1`}
                    >
                      {stat.label}
                    </p>
                    <p className={`text-2xl font-bold text-${stat.color}-700`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataAnalyzer;
