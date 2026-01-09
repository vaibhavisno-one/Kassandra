import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


export const Hero =()=>{

return (
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <Badge variant="outline" className="mb-4">
            Universal Sentiment Engine
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-blue-600 bg-clip-text text-transparent select-none">
            Predict Stock Movements Using Real-World Sentiment
          </h1>

          <p className="text-xl md:text-2xl text-foreground max-w-2xl font-[16px] mx-auto leading-relaxed">
            Combine live market data with multi-source sentiment analysis from news,
            Google Trends, and Wikipedia to generate explainable ML predictions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <Button size="lg"  className="text-lg px-8 h-12 ">
                Launch Dashboard →
              </Button>
            </Link>
            <Button size="lg" variant={"ghost"} className="text-lg px-8 h-12 hover:bg-blue-900 hover:text-white transition-all duration-300 ease-in-out">
              View Documentation
            </Button>
          </div>

          
        </div>
      </section>
      )
    }