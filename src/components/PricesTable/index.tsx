import React from "react";
import "./styles.scss";

interface PricesTableProps<T> {
  data: T[];
  fieldsToHide: string[];
}

function PricesTable<T>(props: PricesTableProps<T>) {
  const { data, fieldsToHide } = props;

  const fieldsToShow =
    data?.length > 0
      ? Object.keys(data[0] as object).filter(
          (key) => !fieldsToHide.includes(key)
        )
      : [];

  return (
    <div>
      {data?.length ? (
        <table className="StyleTable">
          <thead>
            <tr>
              <th className="TablePadding ApplyShadow">Breakdown</th>

              {data?.map((d: T) => (
                <th className="TablePadding">
                  {(d as { fiscalDateEnding: string })?.["fiscalDateEnding"]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fieldsToShow?.map((field) => (
              <tr>
                <td
                  className="TablePadding ApplyShadow"
                  style={{ fontWeight: "bold" }}
                >
                  {field}
                </td>
                {data?.map((d: any) => (
                  <td className="TablePadding">{d?.[field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PricesTable;
