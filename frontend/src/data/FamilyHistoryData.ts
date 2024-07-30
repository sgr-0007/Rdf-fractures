export interface FamilyHistoryOption {
    value: string;
    label: string;
  }
  
  export const sexOptions: FamilyHistoryOption[] = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  
  export const livesAtHomeOptions: FamilyHistoryOption[] = [
    { value: "000000012", label: "Father" },
    { value: "000000011", label: "Mother" },
    { value: "000000013", label: "Grandmother" },
    { value: "000000015", label: "Sibling" },
    { value: "000000017", label: "Stepfather" },
    { value: "000000016", label: "Stepmother" },
    { value: "000000018", label: "Others" },
  ];
  
  export const broughtInByOptions: FamilyHistoryOption[] = [
    { value: "000000012", label: "Father" },
    { value: "000000011", label: "Mother" },
    { value: "000000013", label: "Grandmother" },
    { value: "000000015", label: "Sibling" },
    { value: "000000017", label: "Stepfather" },
    { value: "000000016", label: "Stepmother" },
    { value: "000000018", label: "Others" },
  ];
  
  export const safeguardingOptions: FamilyHistoryOption[] = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  
  export const socialServicesOptions: FamilyHistoryOption[] = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  
  export const complaintOptions: FamilyHistoryOption[] = [
    { value: "000000354", label: "Abdominal pain" },
    { value: "000000355", label: "Blood in stool" },
    { value: "000000356", label: "Blood in urine" },
    { value: "000000343", label: "Bruise" },
    { value: "000000357", label: "Constipation" },
    { value: "000000352", label: "Cough" },
    { value: "000000346", label: "Deformity of Limb" },
    { value: "000000351", label: "Drowsy" },
    { value: "000000341", label: "Fever" },
    { value: "000000340", label: "Generally Unwell" },
    { value: "000000349", label: "Headache" },
    { value: "000000348", label: "Limp" },
    { value: "000000347", label: "Pseudo paralysis of a limb" },
    { value: "000000342", label: "Rash/Skin problem" },
    { value: "000000350", label: "Seizure" },
    { value: "000000353", label: "Short of breath" },
    { value: "000000359", label: "Social concerns" },
    { value: "000000345", label: "Swelling of limb" },
    { value: "000000344", label: "Trauma" },
    { value: "000000358", label: "Vomiting" },
  ];
  
  export const canWalkOptions: FamilyHistoryOption[] = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  
  export const preExistingConditionsOptions: FamilyHistoryOption[] = [
    { value: "000000376", label: "Allergy" },
    { value: "000000377", label: "Hypothyroidism" },
  ];
  