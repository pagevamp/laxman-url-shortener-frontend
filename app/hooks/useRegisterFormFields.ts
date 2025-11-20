import { useState } from "react";
import { registerActionState } from "../lib/zodSchemas/register.schema";

const useRegisterFormFields = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<registerActionState["errors"]>({});

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    loading,
    setLoading,
    error,
    setError,
  };
};

export default useRegisterFormFields;
