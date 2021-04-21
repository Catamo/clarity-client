(function (c, l, a, r, i, t, y) {
  t = l.createElement(r);
  t.async = 1;
  t.src = a;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
  c("start", i);
  c.q.unshift(c.q.pop());
})(
  clarity,
  document,
  "https://www.clarity.ms/wus2/s/0.6.10/clarity.js",
  "script",
  {
    projectId: "<PROJECT_ID>",
    upload: "<COLLECT_URL>",
    expire: 365,
    cookies: ["_uetmsclkid", "_uetvid"],
    track: true,
    content: true,
  }
);
