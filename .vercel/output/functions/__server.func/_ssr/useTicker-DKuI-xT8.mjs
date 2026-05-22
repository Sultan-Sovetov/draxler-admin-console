import { r as reactExports } from "../_libs/react.mjs";
function useTicker(intervalMs = 1e3) {
  const [now, setNow] = reactExports.useState(() => Date.now());
  reactExports.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
export {
  useTicker as u
};
