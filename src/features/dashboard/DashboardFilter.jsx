import { useTranslation } from "react-i18next";
import Filter from "../../ui/Filter";

function DashboardFilter() {
  const { t } = useTranslation();

  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: t("dashboard.filter.last7") },
        { value: "30", label: t("dashboard.filter.last30") },
        { value: "90", label: t("dashboard.filter.last90") },
      ]}
    />
  );
}

export default DashboardFilter;
