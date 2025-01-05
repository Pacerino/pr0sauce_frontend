import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "./ApolloWrapper";

export const metadata: Metadata = {
  title: "pr0sauce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <ApolloWrapper>
          <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl text-f2f5f4">pr0sauce</h1>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/Pacerino/pr0music"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-f2f5f4 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://pr0gramm.com/top/4625113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-f2f5f4 hover:underline"
                >
                  pr0gramm Post
                </a>
              </div>
            </div>
          </nav>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
