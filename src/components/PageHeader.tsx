import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<Props> = ({ title, subtitle, actions }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base text-gray-500 font-medium">
            {subtitle}
          </p>
        )}
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>

      <div className="flex items-center gap-3">
        {actions}
      </div>
    </div>
  );
};

export default PageHeader;
