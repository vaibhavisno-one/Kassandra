# Kassandra Frontend

Next.js frontend for the Kassandra stock prediction platform.

## Features

- 🎯 **Stock Prediction Interface**: Input stock symbol and date range
- 📊 **Sentiment Analysis Dashboard**: View multi-source sentiment breakdown
- 📥 **CSV Downloads**: Export features and predictions data
- 🎨 **Modern UI**: Built with shadcn/ui and Tailwind CSS
- 🌙 **Dark Mode**: Full dark mode support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Kassandra backend running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Project Structure

```
app/
├── page.tsx              # Landing page
├── dashboard/
│   └── page.tsx          # Main dashboard
├── layout.tsx            # Root layout
└── globals.css           # Global styles

components/
└── ui/                   # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── badge.tsx
    └── calendar.tsx

lib/
├── api.ts                # API client for backend
└── utils.ts              # Utility functions
```

## Usage

1. Navigate to the dashboard at `/dashboard`
2. Enter a stock symbol (e.g., TSLA, NVDA, AAPL)
3. Select start and end dates
4. Click "Predict" to generate prediction
5. View sentiment analysis breakdown
6. Download CSV files for features and predictions

## API Integration

The frontend communicates with the FastAPI backend through the API client in `lib/api.ts`:

- `GET /health` - Health check
- `POST /predict` - Generate stock prediction
- `GET /download/features` - Download features CSV
- `GET /download/predictions` - Download predictions CSV

## Development

```bash
# Run dev server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Production Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables for Production

Set `NEXT_PUBLIC_API_URL` to your production backend URL.

## License

MIT
