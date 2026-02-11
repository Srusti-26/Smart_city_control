# Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

## Getting Your API Key

1. Visit [ScaleDown API](https://api.scaledown.xyz)
2. Sign up for an account
3. Generate your API key
4. Keep it secure - you'll need it in the next steps

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd smart-city-control-center
```

### 2. Configure Environment Variables

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file and add your ScaleDown API key:

```env
LLM_API_URL=https://api.scaledown.xyz/compress/raw/
LLM_API_KEY=your_actual_api_key_here
PORT=3000
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Application

**Windows:**
```bash
# From the root directory
start.bat
```

**Manual start:**
```bash
cd backend
npm start
```

### 5. Access the Dashboard

Open your browser and navigate to:
```
http://localhost:3000
```

## Verification

To verify everything is working:

1. Check the backend console - you should see "LLM proxy server listening on 3000"
2. Open the dashboard - you should see the Smart City Control Center interface
3. Try the chat interface - type "city status" and press enter
4. Check the activity feed - you should see agent activities

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
1. Edit `backend/.env`
2. Change `PORT=3000` to another port (e.g., `PORT=3001`)
3. Restart the server

### API Key Errors
If you see API key errors:
1. Verify your API key in `backend/.env`
2. Ensure there are no extra spaces
3. Check that the API endpoint is correct

### Dependencies Not Installing
If npm install fails:
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### Browser Compatibility
For best experience, use:
- Chrome (recommended)
- Edge
- Firefox

Voice commands work best in Chrome/Edge.

## Next Steps

- Read the [README.md](README.md) for feature documentation
- Check [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute
- Explore the dashboard and try different features!

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the browser console for errors
3. Open an issue on GitHub with details
