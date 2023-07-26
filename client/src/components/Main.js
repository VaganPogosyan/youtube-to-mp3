import React from "react";
import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";

export const Main = () => {
  const [data, setData] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleClick = (event) => {
    fetch("/api/convert", {
      method: "POST",
      body: JSON.stringify({
        link: link,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((err) => console.error(err.message));
  };

  const handleChange = (event) => {
    setLink(event.target.value);
  };

  return (
    <div style={{ margin: 100 }}>
      <Input link={link} handleChange={handleChange} />
      <Button handleClick={handleClick} />
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
};
