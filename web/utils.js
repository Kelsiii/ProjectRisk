export function host() {
  const protocol = window.location.protocol;
  const port = (protocol === 'https:' ? 8082 : 7000);
  const addr = (window.webpackHotUpdate ?
    `${window.location.hostname}:${port}` :
    window.location.host);
  return `${protocol}//${addr}`;
}