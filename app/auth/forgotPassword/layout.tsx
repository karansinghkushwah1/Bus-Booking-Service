import '../../globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your account password',
};

// Applying jakarta sans for all components
const plusJakartaSans = Plus_Jakarta_Sans({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className={plusJakartaSans.className}>{children}</body>
    </html>
  );
}
