import path from "path";

// /module.exports =
// Send every request to the React app
// Define any API routes before this runs
appHTMLBaseRoute.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

export default appHTMLBaseRoute;
