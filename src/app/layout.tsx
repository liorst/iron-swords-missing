import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "../components/nav-bar";
import Footer from "../components/footer";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  if (process.env.NODE_ENV === "development") {
    return {};
  }
  const url = "https://ironswords.org.il";
  const title = "חרבות ברזל - איתור ועדכון נעדרים";
  const desc = "חרבות ברזל - איתור ועדכון נעדרים";

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("title", title);
  ogUrl.searchParams.set("type", "article");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      type: "article",
      url,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: desc,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <NavBar />
              <Toaster />
              {children}
              {process.env.NODE_ENV !== "development" && <Analytics />}
              <Footer />
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}
