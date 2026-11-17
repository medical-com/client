import { useLocation } from "react-router-dom";
import {
  ADMIN_NAVIGATION,
  DOCTOR_NAVIGATION,
  RECEPTIONIST_NAVIGATION,
} from "./constants";

export const useNaviagtionList = () => {
  const location = useLocation();
  let navigation = RECEPTIONIST_NAVIGATION;
  if (location.pathname.startsWith("/dashboard/admin"))
    navigation = ADMIN_NAVIGATION;
  if (location.pathname.startsWith("/dashboard/doctor"))
    navigation = DOCTOR_NAVIGATION;

  return navigation;
};
