import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-earth-600 font-medium py-3 border-b border-earth-200/60 mb-8 overflow-x-auto">
      <Link to="/" className="flex items-center gap-1 hover:text-forest-900 transition-colors shrink-0">
        <Home className="w-3.5 h-3.5 text-brass-600" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            {isLast || !item.link ? (
              <span className="text-forest-950 font-semibold truncate shrink-0">
                {item.label}
              </span>
            ) : (
              <Link to={item.link} className="hover:text-forest-900 transition-colors shrink-0">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
