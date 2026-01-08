import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">Kassandra</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Try Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <Badge variant="secondary" className="mb-4">
            Universal Sentiment Engine
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Predict Stock Movements Using Real-World Sentiment
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Combine live market data with multi-source sentiment analysis from news,
            Google Trends, and Wikipedia to generate explainable ML predictions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 h-12">
                Launch Dashboard →
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 h-12">
              View Documentation
            </Button>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Live Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Explainable AI</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>CSV Export</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-24 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Three Steps to Prediction
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our ML pipeline transforms raw data into actionable insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 font-bold text-xl">
                    1
                  </div>
                </div>
                <CardTitle className="text-2xl">Input</CardTitle>
                <CardDescription className="text-base">
                  Provide stock symbol and date range
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>Historical price data from Yahoo Finance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>Technical indicators (MA, volatility)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>Configurable time windows</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 font-bold text-xl">
                    2
                  </div>
                </div>
                <CardTitle className="text-2xl">Sentiment Fusion</CardTitle>
                <CardDescription className="text-base">
                  Multi-source sentiment aggregation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                    <span>News sentiment via VADER analysis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                    <span>Google Trends search interest</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                    <span>Wikipedia pageview analytics</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-500 font-bold text-xl">
                    3
                  </div>
                </div>
                <CardTitle className="text-2xl">Prediction</CardTitle>
                <CardDescription className="text-base">
                  ML-powered next-day forecast
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    <span>Random Forest regression model</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    <span>Explainable feature breakdown</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    <span>Exportable CSV predictions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Built for Developers Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">Developer-First</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Built for Developers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Production-ready ML pipeline with full transparency and reproducibility
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Live Data Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>Real-time data fetching from Yahoo Finance, Google News RSS, Google Trends API, and Wikipedia pageviews. No stale datasets.</p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">yfinance</Badge>
                  <Badge variant="secondary">pytrends</Badge>
                  <Badge variant="secondary">feedparser</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  Explainability First
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>Every prediction includes sentiment breakdown, feature importance, and validation metrics. Understand exactly how the model works.</p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">Sentiment Scores</Badge>
                  <Badge variant="secondary">Feature Logs</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  Reproducible Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>Fixed random seeds, versioned dependencies, and deterministic training. Run the same experiment twice, get identical results.</p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">random_state=42</Badge>
                  <Badge variant="secondary">requirements.txt</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                  CSV Export Ready
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>Export features and predictions as CSV for further analysis, visualization, or integration with your own tools and workflows.</p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">features.csv</Badge>
                  <Badge variant="secondary">predictions.csv</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-24 bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">FAQ</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left hover:no-underline">
                What is Project Kassandra?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Project Kassandra is a universal sentiment engine that combines live market data with multi-source sentiment analysis
                to predict next-day stock closing prices. It uses machine learning to fuse signals from news, Google Trends, and Wikipedia
                into explainable predictions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left hover:no-underline">
                Is this financial advice or a trading tool?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No. Kassandra is a research and educational tool for understanding how sentiment correlates with market movements.
                It is not financial advice and should not be used for actual trading decisions. Always consult a licensed financial advisor.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left hover:no-underline">
                What data sources does Kassandra use?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Kassandra fetches live data from Yahoo Finance (price history), Google News RSS (news sentiment via VADER),
                Google Trends (search interest), and Wikipedia (pageview analytics). All sources are publicly available and free to use.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left hover:no-underline">
                Can I export the predictions and features?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. Every prediction generates two CSV files: one with all engineered features (technical indicators + sentiment scores)
                and one with day-by-day predictions vs. actual prices. You can download both directly from the dashboard.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left hover:no-underline">
                How accurate are the predictions?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Accuracy varies by stock, time period, and market conditions. Kassandra provides validation metrics (MAE, RMSE) for transparency.
                The goal is explainability and research, not guaranteed accuracy. Stock markets are inherently unpredictable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left hover:no-underline">
                Is the code open source?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The backend is built with FastAPI and scikit-learn, and the frontend uses Next.js with TypeScript.
                All dependencies are listed in requirements.txt and package.json for full reproducibility.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to explore sentiment-driven predictions?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Launch the dashboard and start analyzing stocks with multi-source sentiment fusion.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 h-12">
                  Launch Dashboard →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                  K
                </div>
                <span className="text-lg font-semibold">Kassandra</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Universal Sentiment Engine for stock prediction research.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                <li><Link href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">API Reference</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2026 Project Kassandra. Not financial advice. For research and educational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
