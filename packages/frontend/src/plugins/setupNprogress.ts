import NProgress from "nprogress";
import "nprogress/nprogress.css";

/** Setup plugin NProgress */
export function setupNProgress() {
  NProgress.configure({ easing: "ease", speed: 500 });

  // mount on window
  window.NProgress = NProgress;
}
