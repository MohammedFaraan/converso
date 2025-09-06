import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="w-full bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <Image src="/images/logo.svg" alt="Converso Logo" width={36} height={36} />
                <span className="text-xl font-bold">Converso</span>
              </div>
              <p className="text-muted-foreground">AI-powered learning companions for personalized education.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/companions" className="text-muted-foreground hover-link">Companions</Link></li>
                <li><Link href="/my-journey" className="text-muted-foreground hover-link">My Journey</Link></li>
                <li><Link href="/subscription" className="text-muted-foreground hover-link">Subscription</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover-link">Documentation</Link></li>
                <li><Link href="#" className="text-muted-foreground hover-link">API</Link></li>
                <li><Link href="#" className="text-muted-foreground hover-link">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover-link">Twitter</Link></li>
                <li><Link href="#" className="text-muted-foreground hover-link">GitHub</Link></li>
                <li><Link href="#" className="text-muted-foreground hover-link">Discord</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Converso. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover-link">Terms</Link>
              <Link href="#" className="text-sm text-muted-foreground hover-link">Privacy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover-link">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    )
}