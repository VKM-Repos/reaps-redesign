import React from "react";

type Props = {
  search?: React.ReactNode;
  filter?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

const TableWrapper = ({ search, filter, actions, children }: Props) => {
  return (
    <section className="w-full flex flex-col items-start justify-center gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-start gap-x-6">
          <span>{search}</span>
          <span>{filter}</span>
        </div>
        <div className="flex place-content-end">{actions}</div>
      </div>
      {children}
    </section>
  );
};

export default TableWrapper;
