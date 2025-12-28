export type Gender = "Male" | "Female" | "Unsex";

export interface CitizenId {
  part1: string;
  part2: string;
  part3: string;
  part4: string;
  part5: string;
}

export interface Person {
  id: string;
  title: "Mr" | "Mrs" | "Ms";
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenId: CitizenId;
  gender: Gender;
  mobileCode: string;
  mobile: string;
  passport: string;
  salary: number;
}
