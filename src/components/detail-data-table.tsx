import { Fragment, type ReactNode } from "react";

type DetailDataTableSection = {
  label: string;
  rows: Array<{ label: string; value: ReactNode }>;
};

export const DetailDataTable = ({
  sections,
  ariaLabel,
  compact = false,
}: {
  sections: DetailDataTableSection[];
  ariaLabel: string;
  compact?: boolean;
}) => (
  <div className="overflow-hidden rounded-[5px] border border-primary/10">
    <table className="w-full border-collapse text-left" aria-label={ariaLabel}>
      <tbody>
        {sections.map((section) => (
          <Fragment key={section.label}>
            <tr className="border-b border-primary/10 bg-primary/3">
              <th
                colSpan={2}
                className={compact ? "px-3 py-2 text-[10px] font-extrabold tracking-[0.16em] text-accent" : "px-5 py-3 text-xs font-extrabold tracking-[0.18em] text-accent"}
                scope="colgroup"
              >
                {section.label}
              </th>
            </tr>
            {section.rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-primary/10 last:border-b-0"
              >
                <th
                  className={compact ? "w-1/4 px-3 py-2 text-xs font-semibold text-primary/55" : "w-1/3 px-5 py-4 text-sm font-semibold text-primary/55 sm:w-1/4"}
                  scope="row"
                >
                  {row.label}
                </th>
                <td className={compact ? "px-3 py-2 text-xs font-medium text-primary/85" : "px-5 py-4 text-sm font-medium text-primary/85"}>
                  {row.value}
                </td>
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  </div>
);
