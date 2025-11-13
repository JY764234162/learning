export function setupLoading() {
  const loading = `
<div class="fixed-center flex-col" >
  <div class="w-56px h-56px my-36px">
    <div class="relative h-full animate-spin text-#646464"">
      loading...
    </div>
  </div>
</div>`;

  const app = document.getElementById("root");

  if (app) {
    app.innerHTML = loading;
  }
}
