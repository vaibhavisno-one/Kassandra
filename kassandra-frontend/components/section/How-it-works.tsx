
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


export default function HowItWorks(){

return(


      <section id="how-it-works" className="container mx-auto px-4 py-24 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className='text-xl'>How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400">
              Three Steps to Prediction
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our ML pipeline transforms raw data into actionable insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 ease-in-out">
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

            <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:shadow-purple-300 transition-all duration-300 ease-in-out">
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

            <Card className="relative overflow-hidden border-2 hover:shadow-xl hover:shadow-green-300 transition-all duration-300 ease-in-out">
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
      )
    }