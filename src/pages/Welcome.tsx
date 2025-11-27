import { useNavigate } from "react-router-dom";
import NameInput from "@/components/NameInput";

const Welcome = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/index");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-4xl">
        <NameInput onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default Welcome;
