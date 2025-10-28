// ==========================================
// 🏠 WEEK 1: Index.tsx - Homepage Component
// ==========================================
// This is your main homepage! You will customize this in Week 1
// and add interactive components starting in Week 2.

// 📦 React imports - the core tools for building components
import { useState } from "react";

// 🎨 Icon imports - beautiful icons for your UI
import {
  Upload,
  BarChart3,
  TrendingUp,
  Database,
  Heart,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Brain,
  Zap,
} from "lucide-react";

// 🧩 UI Component imports - pre-built components for your interface
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 📊 Data-related imports - components that handle your data
import DataUpload from "@/components/DataUpload";
import Dashboard from "@/components/Dashboard";
import { DataRow } from "@/types/data";
import UploadProgressSimulator from "@/components/UploadProgressSimulator";
import NameInput from "@/components/NameInput";
import SimpleChart from "@/components/simplechart";

// 🔧 WEEK 2: Import your UploadProgressSimulator component here
// 🔧 WEEK 3+: Additional imports will be added as you progress

const Index = () => {
  // 🧠 Component State - this is your component's memory!
  // useState lets your component remember and change data
  const [data, setData] = useState<DataRow[]>([]); // Stores uploaded data
  const [fileName, setFileName] = useState<string>(""); // Remembers file name

  // 🔄 Event Handler - function that runs when data is uploaded
  const handleDataLoad = (loadedData: DataRow[], name: string) => {
    setData(loadedData);
    setFileName(name);
    console.log("Data loaded:", loadedData.length, "rows");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* 🎨 Hero Section - The top part of your homepage */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          {/* 🎯 Logo and Title */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <Database className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* 📝 WEEK 1: Students customize this title with their name */}
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Plug-N-Learn: Kambili's Dashboard
          </h1>
          <p className="text-xl text-slate-600 mb-2">Data Insight Engine</p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Upload your dataset and instantly discover insights, visualize
            trends, and explore your data with interactive charts and analytics.
            Built by Kambili - Top Software Engineer
          </p>
          {/* 🆕 WEEK 3: Live Event Handling Demo (removed NameInput from homepage) */}
          {
            <div className="mt-8 mb-8 flex justify-center">
              <div className="w-full max-w-4xl">
                <NameInput />
              </div>
            </div>
          }
        </div>

        {/* 🔧 WEEK 2: ADD YOUR PROGRESS COMPONENT HERE! */}
        {/* This is where students will add their UploadProgressSimulator component */}
        {/* Example: */}
        {
          <div className="mb-8">
            <UploadProgressSimulator />
          </div>
        }

        {
          <div className="mb-8">
            <SimpleChart />
          </div>
        }

        {data.length === 0 ? (
          <>
            {/* 🎨 Features Grid - Shows what your app can do */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* 📤 Upload Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Easy Data Upload</CardTitle>
                  <CardDescription>
                    Simply drag and drop your CSV files or click to browse.
                    Support for various data formats.
                  </CardDescription>
                </CardHeader>
              </Card>
              {/* 📊 Charts Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">Interactive Charts</CardTitle>
                  <CardDescription>
                    Automatically generate bar charts, line graphs, pie charts,
                    and more from your data.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 🧠 Insights Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">Smart Insights</CardTitle>
                  <CardDescription>
                    Discover patterns, trends, and statistical insights
                    automatically generated from your dataset.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </>
        ) : (
          <>
            <Dashboard
              data={data}
              fileName={fileName}
              onReset={() => {
                setData([]);
                setFileName("");
              }}
            />
          </>
        )}
      </div>

      {/* Footer Section */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/50 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* 👤 Name and Copyright Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-full">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-slate-700">
                  Kambili's Dashboard
                </p>
                <p className="text-sm text-slate-500">
                  © {new Date().getFullYear()} Kambili. All rights reserved.
                </p>
              </div>
            </div>

            {/* 🔧 Built with React Section */}
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-sm">Built with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                React
              </span>
            </div>

            {/* 🔗 Social Media Links Section */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 hidden sm:block">
                Connect:
              </span>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-auto hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  asChild
                >
                  <a
                    href="https://github.com/kambili"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-auto hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  asChild
                >
                  <a
                    href="https://linkedin.com/in/kambili"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-auto hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  asChild
                >
                  <a
                    href="https://twitter.com/kambili"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* 📱 Mobile-friendly divider and additional info */}
          <div className="border-t border-slate-200/50 mt-2 pt-2 text-center">
            <p className="text-xs text-slate-400">
              Data Insight Engine • Empowering decisions through visualization
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
