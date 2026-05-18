// Renders children on the server and on the client so the markup is present in
// view-source for crawlers. Code-splitting is still handled by dynamic() at the
// import site; this wrapper now exists only as a structural passthrough so the
// existing call-sites do not have to change.
export default function LazyWhenVisible({ children }) {
  return <>{children}</>;
}
