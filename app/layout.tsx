//INCLUDES:
import type { Metadata } from "next";
import "./globals.css";
import {Home} from "lucide-react"; 
import SearchBarContainer from "./components/SearchBar";
import NavBar from "./components/NavBar";

//INCLUDES: END

export const metadata: Metadata = {
  title: "Next.js App",
  description: "A Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <NavBar />
          <div className="flex items-center justify-between p-4">
            <a href="/" className="hover:underline flex items-center self-start">
              <Home className="w-6 h-6" />
            </a>
            <div className="flex-1 max-w-2xl mx-8">
              <div style={{margin : '0'}}>
                <SearchBarContainer />
              </div>
            </div>
            <div className="w-6"></div> {/* Spacer to balance the layout */}
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}

