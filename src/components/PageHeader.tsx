import React from "react";
import { Button } from "antd";

interface Props {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<Props> = ({ title, subtitle, actions }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        {actions}
        {/* Example primary action for pages that provide one */}
      </div>
    </div>
  );
};

export default PageHeader;
