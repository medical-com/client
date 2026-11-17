export type ServiceCategory =
  | "general"
  | "specialist"
  | "surgery"
  | "dental"
  | "vision"
  | "mental_health"
  | "physical_therapy";

export type ClientService = {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  duration: number;
  doctorIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type ServicePayload = Omit<
  ClientService,
  "id" | "createdAt" | "updatedAt"
>;
export type UpdateServicePayload = Partial<ServicePayload> & { id: string };

export type ServiceListResponse = {
  data: ClientService[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
};

export const serviceCategories: ServiceCategory[] = [
  "general",
  "specialist",
  "surgery",
  "dental",
  "vision",
  "mental_health",
  "physical_therapy",
];
