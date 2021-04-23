# Development

First run `docker-compose up` and make sure that everything runs properly.

Then add this tag to any project, or simply paste the script into the browser console. Make sure to replace `<projectId>`

```html
<script>
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "http://localhost:5000/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "<projectId>");
</script>
```
