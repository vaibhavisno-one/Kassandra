
"use client";

export default function LogoMarquee() {
    
    const logos = [
        { name: "Yahoo Finance", src: "/logos/yahoo-finance.svg" },
        { name: "Google Trends", src: "/logos/google-trends.svg" },
        { name: "Wikipedia", src: "/logos/wikipedia.svg" },
        { name: "FastAPI", src: "/logos/fastapi.svg" },
        { name: "Python", src: "/logos/python.svg" },
        { name: "scikit-learn", src: "/logos/sklearn.svg" },
        { name: "Next.js", src: "/logos/nextjs.svg" },
        { name: "TypeScript", src: "/logos/typescript.svg" },
    ];

    return (
        <section className="py-16 bg-white border-y border-gray-100 max-w-6xl mx-auto">
            <div className="container mx-auto px-4">
                
                <div className="text-center mb-12">
                    <p className="text-xl font-semibold text-gray-900 uppercase tracking-wider">
                        Powered By Industry-Leading Technologies
                    </p>
                </div>

                
                <div className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    
                    <div className="flex w-max animate-marquee hover:pause-marquee motion-reduce:animate-none hover:cursor-pointer">
                        
                        {logos.map((logo, index) => (
                            <div
                                key={`logo-1-${index}`}
                                className="flex items-center justify-center px-8 md:px-12 "
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    className="h-10 md:h-10 w-auto opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                                    onError={(e) => {
                                        
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent) {
                                            parent.innerHTML = `<span class="text-lg font-semibold text-gray-400">${logo.name}</span>`;
                                        }
                                    }}
                                />
                            </div>
                        ))}

                        
                        {logos.map((logo, index) => (
                            <div
                                key={`logo-2-${index}`}
                                className="flex items-center justify-center px-8 md:px-12"
                                aria-hidden="true"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    className="h-8 md:h-10 w-auto opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent) {
                                            parent.innerHTML = `<span class="text-lg font-semibold text-gray-400">${logo.name}</span>`;
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
