//INCLUDES:
import type { Metadata } from "next";
import "./globals.css";
import SearchBarContainer from "./components/SearchBar";

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
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body>
        {children}
        <SearchBarContainer />
      </body>
    </html>
  );
}

