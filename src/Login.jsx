import React, { useMemo, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import http from "./http";

function Login() {
  const history = useHistory();
  const location = useLocation();

  const { from } = useMemo(
    () => location.state || { from: { pathname: "/" } },
    [location.state]
  );

  let login = useCallback(async () => {
    const result = await http.login();
    if (result) {
      window.localStorage.setItem("isAuthenticated", true);
      history.replace(from);
      return;
    }
    alert("login failure", result);
  }, [from, history]);

  return (
    <div>
      <p>
        You must log in to view the page at <code>{from.pathname}</code>
      </p>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
