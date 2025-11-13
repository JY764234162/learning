export const setupConsole = () => {
  console.log(
    `%c${import.meta.env.VITE_APP_TITLE}%c江一`,
    "color: white; font-size: 12px; font-weight: bold; background: red; padding: 3px 5px;",
    "color: white; font-size: 12px; font-weight: bold; background: black; padding:3px 5px;"
  );
};
