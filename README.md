# In-Browser Test Runner

A subset of the node:test test runner API, for use in a browser.

Usage:

1. Create an HTML file, cintaining the single line, like this:
   ```html
   <script src="./something_test.js" type="module"></script>
   ```
2. Create a test, `something_test.js`, starting with

   ```js
   import {
     describe,
     it,
     assert,
   } from "https://cdn.jsdelivr.net/gh/eobrain/in-browser-test/index.min.js";
   ```

3. Add tests using `describe`,`it`, and `assert` using [node:test][1] API. See examples directory for guidance
4. Start a dev server (e.g. by doing `npx live-server`) abd view the HTML file in the browser.
5. Observe the test executing 

[1]: https://nodejs.org/api/test.html#test-runner
