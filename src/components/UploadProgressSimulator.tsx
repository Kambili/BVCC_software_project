import { useState, useEffect, useRef } from "react";

const UploadProgressSimulator = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const intervalRef = useRef(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startUpload = () => {
    setIsUploading(true);
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 15 + 5;

        if (newProgress >= 100) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsUploading(false);
          return 100;
        }

        return newProgress;
      });
    }, 300);
  };

  const resetProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(0);
    setIsUploading(false);
  };

  return (
    <div className="w-full">
      <div className="p-4 bg-white rounded-lg">
        <h3 className="text-lg font-bold text-center mb-4 text-gray-800">
          File Upload Simulator
        </h3>

        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-blue-600">
            {Math.round(progress)}%
          </span>
          <div className="text-sm text-gray-600 mt-2">
            {isUploading && "📤 Uploading file..."}
            {!isUploading && progress === 0 && "📁 Ready to upload"}
            {!isUploading &&
              progress > 0 &&
              progress < 100 &&
              "⏸️ Upload paused"}
            {!isUploading && progress === 100 && "✅ Upload complete!"}
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={startUpload}
            disabled={isUploading || progress === 100}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {isUploading ? "Uploading..." : "Start Upload"}
          </button>

          <button
            onClick={resetProgress}
            disabled={isUploading}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProgressSimulator;
