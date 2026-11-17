export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
};

export type DoctorRowProps = {
  doctor: Doctor;
};

export type SearchField = "name";
