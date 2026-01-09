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
import { Hero } from '@/components/section/Hero';
import HowItWorks from '@/components/section/How-it-works';
import Footer from '@/components/common/Footer';
import DevelopersSection from '@/components/section/Developers-section';
import LogoMarquee from '@/components/section/LogoMarquee';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Hero />
      <HowItWorks />
      <DevelopersSection />
      <LogoMarquee />


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

      
    </div>
  );
}
