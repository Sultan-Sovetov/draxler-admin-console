// Default TanStack Start server entry — delegates to the built-in Nitro handler.
// Nitro auto-detects the deployment target (Vercel, Node, etc.) at build time.

import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";

export default createStartHandler(defaultStreamHandler);
