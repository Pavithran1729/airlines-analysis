# AirDelay - Flight Delay Prediction & Network Simulator

## Project Overview

An interactive ML-powered platform for predicting flight delays and simulating network disruptions across U.S. aviation. Analyze $33B+ in annual delay costs.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Getting Started

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository
git clone https://github.com/Pavithran1729/airlines-analysis.git

# Step 2: Navigate to the project directory
cd airlines-analysis

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server with auto-reloading
npm run dev
```

## Development Options

**Edit Locally**
- Use your preferred IDE
- Clone the repo and push changes
- Full development environment with hot reloading

**Edit on GitHub**
- Navigate to desired files
- Click the "Edit" button (pencil icon)
- Make changes and commit

**Use GitHub Codespaces**
- Navigate to repository main page
- Click "Code" button (green)
- Select "Codespaces" tab
- Click "New codespace"
- Edit and commit changes directly in the browser

## Build and Deploy Instructions

### 1. Configure project for Vercel deployment
```bash
# Install Vercel CLI globally if not already installed
npm install -g vercel

# Configure Vercel project settings
vercel init
```

### 2. Build for production
```bash
# Install dependencies
npm install

# Create production build
npm run build
```

### 3. Push to GitHub repository
```bash
# Initialize Git if needed
git init

# Add the remote repository
git remote add origin https://github.com/Pavithran1729/airlines-analysis.git

# Stage all changes
git add .

# Commit changes
git commit -m "Update project files"

# Push to main branch 
git push -u origin main
```

Note: Make sure you have the necessary permissions to push to the specified GitHub repository.
