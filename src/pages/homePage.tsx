import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div>
      <p className="text-black px-4">{t("home.underConstruction")}</p>
      <div></div>
    </div>
  );
}
