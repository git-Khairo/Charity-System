import { useState } from "react";
import {initialUserData} from "./BeneficiaryData";


export function useBeneficiaryData() {
  const [userData, setUserData] = useState(initialUserData);
  const [formEdit, setFormEdit] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);

  const openEdit = () => {
    setFormEdit(userData);
    setIsEditing(true);
  };

  const closeEdit = () => setIsEditing(false);

  const saveEdit = () => {
    setUserData(formEdit);
    setIsEditing(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormEdit((prev) => ({ ...prev, [name]: value }));
  };

  return {
userData,
formEdit,
setFormEdit,
isEditing,
openEdit,
closeEdit,
saveEdit,
handleFormChange
  };
}
