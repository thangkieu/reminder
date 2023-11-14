import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UseQueryProvider } from "@/components/UseQueryProvider";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "Note Reminder",
  description: "",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <UseQueryProvider>
          <MantineProvider>{children}</MantineProvider>
        </UseQueryProvider>
      </body>
    </html>
  );
}
