import { useState } from "react";
import { registerActionState } from "../lib/zodSchemas/register.schema";

const useRegisterFormFields = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<registerActionState["errors"]>({});
  const [verificationSent, setVerificationSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

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
    verificationSent,
    setVerificationSent,
    resendCooldown,
    setResendCooldown,
  };
};

export default useRegisterFormFields;
