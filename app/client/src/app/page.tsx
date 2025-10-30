import { getTranslations, getLocale } from "next-intl/server";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import "../styles/home.scss";

/**
 * 首页主组件
 */
export default async function Home() {
  // 获取当前语言环境（例如 "en"、"zh"）
  const locale = await getLocale();

  const t = await getTranslations("HomePage");

  // 读取项目配置文件
  const SilvaConfig = parse(
    readFileSync("../config/SilvaConfig.yaml", "utf-8"),
  );

  /**
   * 根据语言从配置文件中获取对应的网站所有者名称。
   * 如果不存在对应语言，则回退到默认名称。
   */
  const siteOwnerName =
    SilvaConfig.site[`name_${locale.split("-")[0]}`] ?? SilvaConfig.site.name;

  /**
   * 将字符串拆分为单个字符的 <span> 元素，用于文字动画。
   * @param text - 需要拆分的文本
   * @param className - 可选的附加类名
   * @param delay - 动画延迟起始偏移量
   * @returns 包含每个字符的 React 节点数组
   */
  const splitToSpans = (text: string, className = "", delay = 0) =>
    Array.from(text).map((char, i) => (
      <span key={i} className={`pop-up delay-${i + delay} ${className}`}>
        {char}
      </span>
    ));

  return (
    <div>
      {/* =====================
          首页介绍区块
         ===================== */}
      <h1 className="text-4xl">
        {(() => {
          // 文本分离，便于后续动画与计算
          const welcome = t("welcome"); // “欢迎”文本
          const owner = siteOwnerName; // 站点所有者名
          const totalLength = (welcome + owner).length; // 总字符长度

          return (
            <>
              {/* “欢迎”文本 */}
              {splitToSpans(welcome)}

              {/* 网站所有者名称 */}
              <span className="inline px-3 font-bold">
                {splitToSpans(owner, "", welcome.length)}
              </span>

              {/* 表情与句号 */}
              {["👋", "."].map((char, i) => (
                <span key={char} className={`pop-up delay-${totalLength + i}`}>
                  {char}
                </span>
              ))}
            </>
          );
        })()}
      </h1>
    </div>
  );
}
