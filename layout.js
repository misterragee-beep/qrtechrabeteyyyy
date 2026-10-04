import "./globals.css";

export const metadata = {
  title: "Review QR Prototype",
  description: "Multi-business QR review assistance prototype"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}