const ROUTES = Object.freeze({
  HOME: "/",
  SCAN: "/scan",
  SIGNATURE_CODE: (code: string) => `/signature/${code}`,
});

export default ROUTES;
