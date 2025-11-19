import { useState } from "react";

const useLoginFormFields = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
  };
};

export default useLoginFormFields;
