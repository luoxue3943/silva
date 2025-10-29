import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

const ChillRoundF = localFont({
  src: [
    {
      path: "../../public/ChillRoundFBold.ttf",
      style: "bold",
    },
    {
      path: "../../public/ChillRoundFRegular.ttf",
      style: "regular",
    },
  ],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={ChillRoundF.className}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
