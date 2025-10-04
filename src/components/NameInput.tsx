import { useState } from "react";

export default function NameInput() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [color, setColor] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [greeting, setGreeting] = useState("");

  // Real-time name validation
  const validateName = (value) => {
    if (value.length > 0 && value.length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    }
    setNameError("");
    return value.length >= 2;
  };

  // Real-time email validation
  const validateEmail = (value) => {
    if (value.length === 0) {
      setEmailError("");
      return true; // Email is optional
    }
    if (!value.includes("@") || !value.includes(".")) {
      setEmailError("Email must contain @ and .");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
    setSubmitted(false);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);

    if (isNameValid && isEmailValid) {
      let message = `Hello, ${name}! 👋`;
      if (color) {
        message += ` Nice choice with ${color}!`;
      }
      setGreeting(message);
      setSubmitted(true);

      // In your own environment, you would save to localStorage like this:
      localStorage.setItem("lastEnteredName", name);
    }
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setColor("");
    setNameError("");
    setEmailError("");
    setGreeting("");
    setSubmitted(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !nameError && !emailError && name.length >= 2) {
      handleSubmit();
    }
  };

  const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Form
        </h1>

        <div className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                nameError
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-indigo-200"
              }`}
              placeholder="Enter your name"
            />
            <div className="flex justify-between items-center mt-1">
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
              <p className="text-gray-500 text-xs ml-auto">
                {name.length} character{name.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email (optional)
            </label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                emailError
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-indigo-200"
              }`}
              placeholder="Enter your email"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* Color Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favorite Color (optional)
            </label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
            >
              <option value="">Select a color</option>
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={!!nameError || !!emailError || name.length < 2}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium"
            >
              Submit
            </button>
            <button
              onClick={handleClear}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Greeting Message */}
        {submitted && greeting && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center font-medium">{greeting}</p>
          </div>
        )}

        {/* localStorage Note */}
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> To use localStorage in your own environment,
            uncomment the localStorage line in the code (line 59).
          </p>
        </div>
      </div>
    </div>
  );
}
