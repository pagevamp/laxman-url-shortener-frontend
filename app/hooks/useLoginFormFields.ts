import { useState } from "react";
import { loginActionState } from "../lib/zodSchemas/login.schema";

const useLoginFormFields = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<loginActionState["errors"]>({});

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    error,
    setError,
  };
};

export default useLoginFormFields;
