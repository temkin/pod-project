const ROUTES = Object.freeze({
  SCAN: "/",
  SIGNED_CODES_HISTORY: "/history",
  SIGNATURE_CODE: (code: string) => `/signature/${code}`,
});

export default ROUTES;
