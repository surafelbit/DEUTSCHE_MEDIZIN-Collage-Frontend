import { useNavigate } from "react-router-dom";
import { clearAllApiCache } from "@/components/api/cacheService";

export function useSignOut() {
  const navigate = useNavigate();

  return async () => {
    localStorage.removeItem("xy9a7b");
    localStorage.removeItem("userRole");
    sessionStorage.clear();
    await clearAllApiCache();
    navigate("/login");
  };
}
