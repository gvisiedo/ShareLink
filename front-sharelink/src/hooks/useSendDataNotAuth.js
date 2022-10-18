import { useState } from "react";

const useSendDataNotAuth = (url) => {
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState();

  const sendData = async (data, method = "POST") => {
    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    setResponse(resData);
    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };
  return [status, response, sendData];
};

export default useSendDataNotAuth;
