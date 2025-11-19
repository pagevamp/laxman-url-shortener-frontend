import { useState } from "react";
import { loginActionState } from "../lib/zodSchemas/login.schema";

const useLoginFormFields = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<loginActionState["errors"]>({});

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    setLoading,
    error,
    setError,
  };
};

export default useLoginFormFields;
