import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function NameInput({ onComplete }) {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState("");
  const [chartPalette, setChartPalette] = useState("");
  const [nameError, setNameError] = useState("");
  const [userType, setUserType] = useState("");

  // Real-time name validation
  const validateName = (value) => {
    if (value.length > 0 && value.length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    }
    setNameError("");
    return value.length >= 2;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handleSubmit = () => {
    const isNameValid = validateName(name);

    if (isNameValid) {
      let message = `Hello, ${name}! 👋`;
      if (chartPalette) {
        const selected = chartPalettes.find((p) => p.value === chartPalette);
        message += ` Love the ${selected.name} palette!`;
      }

      // In your own environment, you would save to localStorage like this:
      localStorage.setItem("userName", name);
      localStorage.setItem("userTheme", theme);
      localStorage.setItem("chartPalette", chartPalette);
      localStorage.setItem("userType", userType);

      // Navigate to Index page after successful submission
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleClear = () => {
    setName("");
    setChartPalette("");
    setNameError("");
    setUserType("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !nameError && name.length >= 2) {
      handleSubmit();
    }
  };

  const chartPalettes = [
    { name: "Cool Blues", value: "blues", emoji: "🔵" },
    { name: "Fresh Greens", value: "greens", emoji: "🟢" },
    { name: "Royal Purples", value: "purples", emoji: "🟣" },
    { name: "Warm Oranges", value: "oranges", emoji: "🟠" },
    { name: "Colorful Mix", value: "colorful", emoji: "🌈" },
    { name: "Professional Grays", value: "grays", emoji: "⚫" },
  ];
  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Welcome Form
        </h1>

        <div className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                nameError
                  ? "border-red-500 focus:ring-red-200 dark:border-red-400 dark:focus:ring-red-800"
                  : "border-gray-300 dark:border-gray-600 focus:ring-indigo-200 dark:focus:ring-indigo-800"
              }`}
              placeholder="Enter your name"
            />
            <div className="flex justify-between items-center mt-1">
              {nameError && <p className="text-red-500 dark:text-red-400 text-sm">{nameError}</p>}
              <p className="text-gray-500 dark:text-gray-400 text-xs ml-auto">
                {name.length} character{name.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How would you describe yourself? (optional)
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 focus:outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select one</option>
              <option value="student">Student / Learning</option>
              <option value="professional">Professional / Business</option>
              <option value="researcher">Researcher / Academic</option>
              <option value="exploring">Just Exploring</option>
            </select>
          </div>

          {/* Chart Color Palette */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chart Color Palette (optional)
            </label>
            <select
              value={chartPalette}
              onChange={(e) => setChartPalette(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 focus:outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select a palette</option>
              {chartPalettes.map((palette) => (
                <option key={palette.value} value={palette.value}>
                  {palette.emoji} {palette.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme Preference
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === "light"}
                  onChange={() => setTheme("light")}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">☀️ Light Mode</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={() => setTheme("dark")}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">🌙 Dark Mode</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={!!nameError || name.length < 2}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium"
            >
              Get Started
            </button>
            <button
              onClick={handleClear}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
