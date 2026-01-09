export default function Footer() {

    return(
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img className="w-20 h-8 md:w-34 md:h-10 inline-block" src="/logo.png" alt="stock icon" />
              </div>
              <p className="text-sm text-muted-foreground">
                Universal Sentiment Engine for stock prediction research.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><p>Dashboard</p></li>
                <li><p>How It Works</p></li>
                <li><p>Features</p></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><p>Documentation</p></li>
                <li><p>FAQ</p></li>
                <li><p>API Reference</p></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><p>Privacy Policy</p></li>
                <li><p>Terms of Service</p></li>
                <li><p>Disclaimer</p></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2026 Project Kassandra. Not financial advice. For research and educational purposes only.</p>
          </div>
        </div>
      </footer>
    )
}