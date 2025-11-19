import { useState } from "react";

const useRegisterFormFields = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
  };
};

export default useRegisterFormFields;
