"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";



export const Hero = () => {

  return (
    <section className="container mx-auto px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center space-y-8">
        <Badge variant="outline" className="mb-4 h-10 w-64">
          Universal Sentiment Engine
        </Badge>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-blue-600 bg-clip-text text-transparent select-none">
          <span className="inline-flex items-center gap-2">
            Predict <img className="w-10 h-10 md:w-14 md:h-14 inline-block cursor-pointer rotate-[-12deg]" src="/stock.png" alt="stock icon" />
          </span>
          <br />
          Stock Movements Using Real-World Sentiment
        </h1>

        <p className="text-xl md:text-xl text-foreground max-w-2xl font-[16px] mx-auto leading-relaxed">
          Combine live market data with multi-source sentiment analysis from news,
          Google Trends, and Wikipedia to generate explainable ML predictions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 h-12 ">
              Launch Dashboard →
            </Button>
          </Link>
          <Button size="lg" variant={"ghost"} className="text-lg px-8 h-12 hover:bg-blue-900 hover:text-white transition-all duration-300 ease-in-out">
            View Documentation
          </Button>
        </div>


        <div className="relative group flex items-center justify-center pt-16 ">

          <div className="absolute inset-0 flex justify-center">
            <div className="h-[800px] w-[100%] rounded-full bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl" />
          </div>


          <div className="flex relative  items-center justify-center pt-10 z-10 group-hover:blur-[6px] transition-all duration-300 ease-in-out ">
            <div className="w-full   border-2 rounded-xl border-gray-200 shadow-lg shadow-blue-600/50">
              <img src="/dashboard.png" alt="product dashboard" className="h-[600px] w-[100%] rounded-xl z-10  " />
            </div>
          </div>
          <div className="hidden md:inline-flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[20] opacity-0 group-hover:opacity-100
           scale-90 group-hover:scale-105 duration-100 ease-in-out drop-shadow-[0_5px_64px_rgba(0,0,0,0.12)]">
            <button onClick={() => window.location.href = "/dashboard"} className="border border-gray-400 rounded-full px-4 py-2 bg-gray-700/10 shadow-xl shadow-gray-600/50 cursor-pointer hover:bg-blue-600/80 hover:text-white transition-all duration-300 ease-in-out" >Try Now</button>
          </div>



        </div>


      </div>
    </section>
  )
}