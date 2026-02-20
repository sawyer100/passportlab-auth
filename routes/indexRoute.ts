import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { session } from "passport";

router.get("/", (req, res) => {
  res.redirect("/dashboard");
  // res.send("welcome") keep incase for later idk if i did it right
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  const admin = req.user?.role === "admin";

  if (!admin) {
    return res.render("dashboard", {
      user: req.user,
      sessions: null,
      sessionsError: null,
    });
  }

  const a = req.sessionStore as any;

  a.all((err: any, sessions: any) => {
    if (err) {
      return res.render("dashboard", {
        user: req.user,
        sessions: null,
        sessionsError: String(err),
      });
    }

    return res.render("dashboard", {
      user: req.user,
      sessions,
      sessionsError: null,
    });
  });
});

router.post(
  "/sessions/:sid/revoke",
  ensureAuthenticated,
  (req, res) => {
    const sid = req.params.sid;

    req.sessionStore.destroy(sid, (err: any) => {
      if (err) {
        return res.status(500);
      }

      if (sid === req.sessionID) {
        req.logout(() => {
          req.session.destroy(() => res.redirect("/"));
        });
        return;
      }

      return res.redirect("/dashboard");
    });
  }
);
export default router;
