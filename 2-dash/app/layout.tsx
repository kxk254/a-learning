import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { SidebarProvider } from "@/src/context/SidebarContext";

const notoSans = Noto_Sans_JP({
  subsets: ["latin", "japanese"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className}  antialiased dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider> {children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
