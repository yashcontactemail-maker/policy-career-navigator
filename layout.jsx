import './globals.css';

export const metadata = {
  title: 'Policy Career Navigator | Public Policy India + STRIDE Policy Institute',
  description: 'Map your route through India\u2019s policy and social impact ecosystem. 500+ roles, 700+ entry points, 100+ skills, mapped across 12 career spaces. AI-exposure scored. A knowledge product of Public Policy India and STRIDE Policy Institute.',
  openGraph: {
    title: 'Policy Career Navigator | Public Policy India + STRIDE Policy Institute',
    description: 'India\u2019s most comprehensive map of public policy and social impact careers. 500+ roles, 700+ entry points, 12 career spaces, AI-exposure scored.',
    url: 'https://policy-career-navigator.vercel.app',
    siteName: 'Public Policy India + STRIDE Policy Institute',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Policy Career Navigator | Public Policy India + STRIDE Policy Institute',
    description: 'India\u2019s most comprehensive map of public policy and social impact careers.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
