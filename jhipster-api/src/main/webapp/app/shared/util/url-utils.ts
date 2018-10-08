export const getLoginUrl = () => {
  let port = location.port ? `:${location.port}` : '';
  if (port === ':9000') {
    port = ':8080';
  }
  return `//${location.hostname}${port}/login`;
};
