// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var enquiriesStore = [];
var ALLOWED_DRAWING_TYPES = /* @__PURE__ */ new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/dxf",
  "application/acad",
  "application/octet-stream"
]);
async function startServer() {
  const app = express();
  const PORT = 3e3;
  const isProd = process.env.NODE_ENV === "production";
  app.use(express.json({ limit: "8mb" }));
  const getBaseUrl = (req) => {
    const envUrl = process.env.APP_URL;
    if (envUrl && envUrl !== "MY_APP_URL") {
      return envUrl.replace(/\/$/, "");
    }
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
    const host = req.headers["x-forwarded-host"] || req.get("host") || `localhost:${PORT}`;
    return `${protocol}://${host}`;
  };
  app.get("/robots.txt", (req, res) => {
    const baseUrl = getBaseUrl(req);
    res.type("text/plain");
    res.send(
      [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${baseUrl}/sitemap.xml`
      ].join("\n")
    );
  });
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = getBaseUrl(req);
    const routes = [
      { path: "/", priority: "1.0", changefreq: "weekly" },
      { path: "/about-us/", priority: "0.8", changefreq: "monthly" },
      { path: "/products/", priority: "0.9", changefreq: "weekly" },
      { path: "/industries/", priority: "0.8", changefreq: "monthly" },
      { path: "/contact-us/", priority: "0.8", changefreq: "monthly" },
      { path: "/privacy-policy/", priority: "0.3", changefreq: "yearly" },
      { path: "/terms-and-conditions/", priority: "0.3", changefreq: "yearly" }
    ];
    const lastmod = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...routes.map(
        (r) => `  <url>
    <loc>${baseUrl}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
      ),
      "</urlset>"
    ].join("\n");
    res.type("application/xml");
    res.send(xml);
  });
  app.post("/api/enquiry", (req, res) => {
    const body = req.body || {};
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const companyName = typeof body.companyName === "string" ? body.companyName.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const productRequired = typeof body.productRequired === "string" ? body.productRequired.trim() : "";
    const quantity = typeof body.quantity === "string" ? body.quantity.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (fullName.length < 2) {
      return res.status(400).json({ error: "Please provide your full name (minimum 2 characters)." });
    }
    if (companyName.length < 2) {
      return res.status(400).json({ error: "Please provide your company or OEM organization name." });
    }
    if (!/^[+\d\s()-]{7,20}$/.test(phone)) {
      return res.status(400).json({ error: "Please provide a valid contact phone number." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Please provide a valid business email address." });
    }
    if (!productRequired) {
      return res.status(400).json({ error: "Please select or specify the component required." });
    }
    if (!quantity) {
      return res.status(400).json({ error: "Please specify an estimated quantity or batch requirement." });
    }
    if (message.length < 10) {
      return res.status(400).json({ error: "Please enter component details or drawing notes (minimum 10 characters)." });
    }
    if (body.drawingFileName) {
      const size = Number(body.drawingFileSize || 0);
      if (size > 5 * 1024 * 1024) {
        return res.status(400).json({ error: "Drawing attachment must not exceed 5 MB." });
      }
      if (body.drawingFileType && !ALLOWED_DRAWING_TYPES.has(body.drawingFileType) && !/\.(pdf|dxf|dwg|step|stp|igs|iges|png|jpg|jpeg)$/i.test(body.drawingFileName)) {
        return res.status(400).json({ error: "Unsupported drawing format. Upload PDF, CAD (DXF/DWG/STEP), or image files." });
      }
    }
    const referenceId = `JDA-${Date.now().toString(36).toUpperCase()}`;
    const record = {
      referenceId,
      submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
      fullName,
      companyName,
      phone,
      email,
      productRequired,
      quantity,
      message,
      hasDrawing: Boolean(body.drawingFileName),
      drawingFileName: body.drawingFileName,
      drawingFileSize: body.drawingFileSize,
      dispatchStatus: "pending_client_contact_verification"
    };
    enquiriesStore.push(record);
    if (enquiriesStore.length > 250) {
      enquiriesStore.shift();
    }
    return res.status(201).json({
      status: "received_pending_dispatch",
      referenceId,
      submittedAt: record.submittedAt,
      message: "Your technical enquiry has been validated and logged on our server. External email/WhatsApp forwarding awaits final confirmation of J.D. Associates official contact channels."
    });
  });
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`J.D. Associates server listening on http://localhost:${PORT}`);
  });
}
startServer();
