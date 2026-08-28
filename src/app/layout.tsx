import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Turismo de Fartura",
  description: "Portal de turismo de Fartura.",
  icons: {
    icon: [
      {
        url: "/assets/log-perfil-v80.png",
        type: "image/png",
        sizes: "80x74",
      },
    ],
    shortcut: "/assets/log-perfil-v80.png",
    apple: [
      {
        url: "/assets/log-perfil-v80.png",
        type: "image/png",
        sizes: "80x74",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className={jakartaSans.variable}>{children}</body>
    </html>
  );
}
