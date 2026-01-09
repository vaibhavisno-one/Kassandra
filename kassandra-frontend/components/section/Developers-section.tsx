import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DevelopersSection() {

    return (
        <section id="features" className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="text-center space-y-4 mb-16">
                    <Badge variant="outline" className="text-lg">Developer-First</Badge>
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
    )
}