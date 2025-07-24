//INCLUDES:
import type { Metadata } from "next";
import "./globals.css";

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
        <main className="min-h-screen">
          children
        </main>
      </body>
    </html>
  );
  }

