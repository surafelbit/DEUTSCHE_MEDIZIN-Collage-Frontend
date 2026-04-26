import { useNavigate } from "react-router-dom";

export function useSignOut() {
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem("xy9a7b");
    sessionStorage.clear();
    navigate("/login");
  };
}
