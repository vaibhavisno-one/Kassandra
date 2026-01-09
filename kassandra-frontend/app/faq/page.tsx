
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function FAQ() {

return(
      <section id="faq" className="container mx-auto px-4 py-24 bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <div className="text-center space-y-4 mb-16">
            
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
      )
    }