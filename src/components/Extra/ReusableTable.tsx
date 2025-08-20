import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

export interface TableProps<T> {
  columns: TableColumnsType<T>;
  data: T[];
  bordered?: boolean;
}

export function ReusableTable<T extends { key: React.Key }>({
  columns,
  data,
  bordered = true,
}: TableProps<T>) {
  return (
    <Table<T>
      bordered={bordered}
      columns={columns}
      expandable={{
        expandedRowRender: (record) =>
          "description" in record ? (
            <div>{(record as any).description}</div>
          ) : null,
      }}
      dataSource={data}
    />
  );
}
