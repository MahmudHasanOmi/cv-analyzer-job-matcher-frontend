// ============================================
// 24. src/components/layout/Footer.tsx
// ============================================
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} CV Analyzer & Job Matcher. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;