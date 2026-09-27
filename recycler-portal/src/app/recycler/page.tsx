'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RecyclerRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/portal');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-bold text-slate-400">Loading Authorized Recycler Marketplace &amp; GIS Discovery...</p>
      </div>
    </div>
  );
}
