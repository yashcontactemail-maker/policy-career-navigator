import './globals.css';

export const metadata = {
  title: 'Policy Career Navigator | Public Policy India',
  description: 'Explore 50+ career roles across 12 spaces in India\'s policy, social impact, and governance ecosystem. Interactive career discovery, skills mapping, and career ladders for policy professionals.',
  openGraph: {
    title: 'Policy Career Navigator | Public Policy India',
    description: 'Explore 50+ career roles across India\'s policy, social impact, and governance ecosystem. Free interactive career discovery tool.',
    type: 'website',
    siteName: 'Public Policy India',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Policy Career Navigator | Public Policy India',
    description: 'Explore 50+ career roles across India\'s policy ecosystem. Free interactive tool.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
