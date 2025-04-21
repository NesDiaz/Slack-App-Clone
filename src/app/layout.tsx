// app/layout.tsx
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { ConvexClientProvider } from '@/components/convex-client-provider';
import { JotaiProvider } from '@/components/jotai-provider';
import { Toaster } from '@/components/ui/sonner';
import { Modals } from '@/components/modals';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={inter.className}>
          <NuqsAdapter>
            <ConvexClientProvider>
              <JotaiProvider>
                <Toaster />
                <Modals />
                {children}
              </JotaiProvider>
            </ConvexClientProvider>
          </NuqsAdapter>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
