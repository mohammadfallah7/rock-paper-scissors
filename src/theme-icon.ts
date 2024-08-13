import moon from "./assets/moon.svg";
import sun from "./assets/sun.svg";

export function themeIcon(theme: string, element: HTMLElement): void {
  const result = theme === "light" ? moon : sun;
  element.setAttribute("src", result);
}
