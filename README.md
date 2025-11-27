# 📊 Data Insight Engine

**An interactive data analysis dashboard built with React, TypeScript, and AI**

Transform your CSV data into actionable insights with powerful visualizations, AI-powered analysis, and an intuitive interface.

---

## ✨ Features

### 📁 Smart Data Upload
- Drag-and-drop CSV file upload
- Instant data parsing and validation
- Support for various CSV formats
- File history and quick access to recent uploads

### 📊 Interactive Visualizations
- Multiple chart types (bar, line, pie, area)
- Responsive and interactive charts powered by Recharts
- Real-time data filtering and sorting
- Export visualizations and data

### 🤖 AI-Powered Insights
- Automated data analysis and pattern detection
- Natural language insights generation
- AI chat interface for asking questions about your data
- Intelligent recommendations based on data trends

### 🎨 Modern User Experience
- Clean, professional dashboard interface
- Dark mode support
- Responsive design for all devices
- Smooth animations and transitions

### 💾 Data Management
- Local storage for recent files
- Quick access sidebar for file history
- Data export functionality
- Session persistence

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenAI API Key** (for AI features) - [Get one here](https://platform.openai.com/)

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd bvcc

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env file in the root directory
# Add your OpenAI API key:
OPENAI_API_KEY=your_api_key_here

# 4. Start the development servers
npm run dev
```

The application will start:
- **Frontend:** http://localhost:8080
- **AI Server:** http://localhost:4000

### Alternative: Run Servers Separately

```bash
# Terminal 1 - AI Server (port 4000)
npm run dev:server

# Terminal 2 - Frontend (port 8080)
npm run dev:client
```

---

## 📖 How to Use

### 1. Welcome Screen
- Enter your name to personalize your experience
- The app will greet you and take you to the main dashboard

### 2. Upload Your Data
- Click or drag-and-drop your CSV file
- Watch as your data is instantly processed and validated

### 3. Explore Visualizations
- View your data in interactive tables
- Explore multiple chart types
- Filter and sort data in real-time

### 4. Get AI Insights
- Navigate to the Insights tab for automated analysis
- Use the chat interface to ask questions about your data
- Get intelligent recommendations and pattern detection

### 5. Access Recent Files
- Use the sidebar to quickly switch between recent uploads
- All your analyzed files are saved locally for quick access

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first styling
- **Shadcn/ui** - Beautiful, accessible components

### Data & Visualization
- **Recharts** - Powerful charting library
- **React Query** - Data fetching and caching
- **CSV Parsing** - Built-in CSV processing

### AI & Backend
- **OpenAI API** - AI-powered insights
- **Express** - Backend server for AI endpoints
- **AI SDK** - Streamlined AI integration

### Additional Tools
- **React Router** - Client-side routing
- **Lucide Icons** - Beautiful icon library
- **React Hook Form** - Form management
- **Zod** - Schema validation

---

## 📁 Project Structure

```
bvcc/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Dashboard.tsx    # Main dashboard container
│   │   ├── DataUpload.tsx   # File upload component
│   │   ├── DataTable.tsx    # Interactive data table
│   │   ├── ChartSection.tsx # Chart visualizations
│   │   ├── InsightsPanel.tsx # AI insights display
│   │   ├── ChatInterface.tsx # AI chat feature
│   │   ├── AnalysisSidebar.tsx # Recent files sidebar
│   │   └── ui/              # Shadcn UI components
│   ├── pages/               # Page components
│   │   ├── Welcome.tsx      # Welcome/onboarding page
│   │   ├── Index.tsx        # Upload page
│   │   └── DashboardPage.tsx # Main dashboard page
│   ├── utils/               # Utility functions
│   │   ├── dataAnalysis.ts  # Data processing logic
│   │   └── storage.ts       # LocalStorage helpers
│   ├── types/               # TypeScript definitions
│   ├── contexts/            # React contexts
│   ├── server/              # Backend server
│   │   └── insight.js       # AI endpoint server
│   └── App.tsx              # Root component
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

---

## 🎯 Key Features Explained

### Data Upload Component
Handles CSV file uploads with drag-and-drop support, validates data format, and stores processed data for quick access.

### Interactive Dashboard
Displays data in customizable views with real-time filtering, sorting, and chart selection options.

### AI Insights Generation
Analyzes uploaded data to identify trends, patterns, and anomalies. Provides natural language summaries and actionable recommendations.

### Chat Interface
Ask questions about your data in plain English and get intelligent, context-aware responses powered by AI.

### Data Persistence
Uses browser localStorage to save recent files and analysis results, ensuring you can quickly return to previous work.

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# Settings → Environment Variables → Add OPENAI_API_KEY

# Deploy to production
vercel --prod
```

### Option 2: Netlify

```bash
# Build the project
npm run build

# Visit netlify.com and drag-drop the 'dist' folder
```

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Deploy
npm run build && npm run deploy
```

---

## 🔧 Available Scripts

```bash
npm run dev          # Start both frontend and backend
npm run dev:client   # Start frontend only (port 8080)
npm run dev:server   # Start AI server only (port 4000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

This project was built as part of a learning journey. Feel free to fork, modify, and build upon it!

---

## 👤 Author

**Kambili**

- GitHub: [@kambili](https://github.com/kambili)
- LinkedIn: [kambili](https://linkedin.com/in/kambili)
- Twitter: [@kambili](https://twitter.com/kambili)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Built with modern React and TypeScript
- Powered by OpenAI for intelligent insights
- UI components from Shadcn/ui
- Charts by Recharts
- Icons by Lucide

---

**Data Insight Engine** • Empowering decisions through visualization
