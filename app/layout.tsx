//INCLUDES:
import type { Metadata } from "next";
import "./globals.css";
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
          <div>
            <SearchBarContainer />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}

