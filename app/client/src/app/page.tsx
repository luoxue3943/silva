import { getTranslations } from "next-intl/server";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { getLocale } from "next-intl/server";
import "../styles/home.scss";

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations("HomePage");
  const SilvaConfig = parse(
    readFileSync("../config/SilvaConfig.yaml", "utf-8"),
  );

  const siteOwnerName =
    SilvaConfig.site[`name_${locale.split("-")[0]}`] ?? SilvaConfig.site.name;

  const splitToSpans = (text: string, className = "", delay = 0) =>
    Array.from(text).map((char, i) => (
      <span key={i} className={`pop-up delay-${i + delay} ${className}`}>
        {char}
      </span>
    ));

  return (
    <div>
      <h1 className="text-4xl">
        {splitToSpans(t("welcome"))}
        <div className="inline px-3 font-bold">
          {splitToSpans(siteOwnerName, "", t("welcome").length)}
        </div>
        <span
          className={`pop-up delay-${(t("welcome") + siteOwnerName).length}`}
        >
          👋
        </span>
        <span
          className={`pop-up delay-${(t("welcome") + siteOwnerName + "👋").length}`}
        >
          .
        </span>
      </h1>
    </div>
  );
}
