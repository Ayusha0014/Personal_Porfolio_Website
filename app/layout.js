import "./globals.css";

export const metadata = {
  title: "Ayusha — Presentation & Documentation Specialist",
  description:
    "A presentation and documentation portfolio by Ayusha, focused on clear narratives, executive-ready decks, and data visualization.",
  icons: {
    icon: "/ayusha-mark.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
