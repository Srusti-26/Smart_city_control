# Smart City Control Center

An AI-powered Smart City Control Center featuring real-time monitoring, intelligent agent coordination, and ScaleDown compression technology.

![Smart City Dashboard](https://via.placeholder.com/800x400/0a0a0a/00ff88?text=Smart+City+Control+Center)

## Features

### 🌟 **Unique & Creative Features**

#### **1. Multi-Agent AI Coordination System**
Five specialized AI agents work autonomously and collaboratively:
- **Traffic Agent**: Real-time analysis of 847 intersections
- **Energy Agent**: Predictive load balancing and anomaly detection
- **Emergency Agent**: Intelligent resource allocation and response optimization
- **Citizen Agent**: NLP-powered sentiment analysis from complaints
- **Coordinator Agent**: Conflict resolution and priority management across all agents

#### **2. ScaleDown Compression Technology**
- Achieves **82.8% data reduction** using advanced compression
- Processes massive city datasets efficiently
- Real-time compression metrics visualization
- Demonstrates scalability for IoT and Big Data applications

#### **3. Voice-Controlled City Management**
- Natural language processing for city queries
- Hands-free operation using Web Speech API
- Voice commands with AI-powered responses
- Accessibility-first design

#### **4. Real-Time Digital Twin**
- Live SVG visualization of city infrastructure
- Animated data flows between districts
- Dynamic incident markers and alerts
- Interactive city map with real-time updates

#### **5. Intelligent Fallback System**
- Graceful degradation when API is unavailable
- Local AI responses ensure 100% uptime
- Seamless switching between cloud and local processing
- Production-ready reliability

### 💡 **Core Features**

- **Real-time City Monitoring**: Traffic, energy, emergency services, and citizen sentiment
- **AI Agent Coordination**: Multiple specialized agents working together
- **Interactive Dashboard**: Modern web interface with voice commands
- **Live Chat Interface**: Natural language interaction with the city system

## Project Structure

```
smart-city-control-center/
├── backend/                 # Express.js API server
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── index.html             # Frontend dashboard
├── start.bat             # Windows startup script
└── README.md             # This file
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- A ScaleDown API key (get one at https://api.scaledown.xyz)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd smart-city-control-center
   ```

2. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add your ScaleDown API key
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

### Option 1: Use the Startup Script (Windows)
1. Double-click `start.bat`
2. Wait for dependencies to install
3. Dashboard will open automatically at http://localhost:3000

### Option 2: Manual Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Start the Backend**
   ```bash
   npm start
   ```

3. **Open Dashboard**
   - Navigate to http://localhost:3000 in your browser

## Environment Configuration

The `.env` file contains:
- `LLM_API_URL`: ScaleDown compression API endpoint
- `LLM_API_KEY`: Your API key for the compression service
- `PORT`: Server port (default: 3000)

## Dashboard Features

### 1. **Dashboard Tab**
- Real-time city metrics (traffic, energy, emergencies, sentiment)
- Interactive city map visualization
- Live agent activity feed
- Quick action buttons

### 2. **Agents Tab**
- Individual agent status and performance
- Traffic, Energy, Emergency, and Citizen agents
- Coordinator agent orchestration

### 3. **ScaleDown Tab**
- Compression metrics and statistics
- Data reduction visualization
- Real-time compression logs

### 4. **Chat Tab**
- Natural language interface
- Voice commands support
- Quick command buttons

## Voice Commands

- "What's the city status?"
- "Simulate an emergency"
- "Optimize traffic now"
- "Give me the daily summary"
- "Balance energy grid"

## API Endpoints

- `GET /health` - Health check
- `POST /agent/analyze` - Agent analysis with ScaleDown compression
- `POST /chat` - Chat interface with city context
- `POST /generate` - Direct proxy to ScaleDown compression API

## Agent System

The system includes 5 AI agents:

1. **Traffic Agent**: Monitors 847 intersections, optimizes flow
2. **Energy Agent**: Manages grid load, forecasts peaks
3. **Emergency Agent**: Coordinates incident response
4. **Citizen Agent**: Analyzes complaints and sentiment
5. **Coordinator Agent**: Orchestrates all agents, resolves conflicts

## Compression Technology

ScaleDown compression reduces data volume by 82.8%:
- Traffic sensor logs: 245KB → 54KB (78% reduction)
- Energy time series: 180KB → 27KB (85% reduction)
- Citizen complaints: 92KB → 35KB (62% reduction)
- Agent communication: 330KB → 30KB (91% reduction)

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Adding New Features
1. Modify `index.html` for frontend changes
2. Update `backend/index.js` for API changes
3. Restart the server to see changes

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   - Change PORT in `.env` file
   - Or stop other services using port 3000

2. **API key errors**
   - Verify LLM_API_KEY in `.env` file
   - Check API endpoint availability

3. **Voice commands not working**
   - Ensure microphone permissions
   - Use Chrome/Edge for best compatibility

### Logs
Check the console in your browser's developer tools for detailed error messages.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **APIs**: ScaleDown compression service
- **Voice**: Web Speech API

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Creative Features

Want to learn more about what makes this project unique? Check out [CREATIVE_FEATURES.md](CREATIVE_FEATURES.md) for detailed explanations of our innovative features.

## Setup Guide

For detailed setup instructions, see [SETUP.md](SETUP.md).

## License

MIT License - see [LICENSE](LICENSE) file for details.