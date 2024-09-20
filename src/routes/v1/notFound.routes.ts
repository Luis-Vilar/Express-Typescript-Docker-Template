import { Router } from "express";

export const notFoundRoute = Router();
notFoundRoute.use((req, res) => {
  const report = {
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    params: req.params,
    headers: req.headers,
    ip: req.ip,
  };
  //Todo: send the report to the admin (report)=>{send(report)}
  res.status(404).json({
    error: "Not Found",
    message:
      "The requested route does not exist, a report has been sent to the admin",
    statusCode: 404,
    report,
  });
});


