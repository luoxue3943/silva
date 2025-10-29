import localFont from "next/font/local";
import "./globals.css";

const ChillRoundF = localFont({
  src: "../../public/ChillRoundFBold.ttf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ChillRoundF.className}>{children}</body>
    </html>
  );
}
