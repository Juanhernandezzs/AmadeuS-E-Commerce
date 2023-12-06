import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const { REACT_APP_SERVER } = process.env;

export default function Account() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  console.log("user", user);
  console.log("test", isAuthenticated);
  const entrarConToken = async () => {
    try {
      console.log("click");
      const token = isAuthenticated && (await getAccessTokenSilently());
      console.log("token", token);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(REACT_APP_SERVER + "/auth", { headers });

      console.log("response", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const entrarSinToken = async () => {
    try {
      const response = await axios.get(REACT_APP_SERVER + "/auth");
      console.log("response", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={entrarConToken}>ENTRAR CON TOKEN</button>
      <button onClick={entrarSinToken}>ENTRAR SIN TOKEN</button>
    </div>
  );
}
