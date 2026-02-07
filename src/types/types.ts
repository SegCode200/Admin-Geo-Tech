export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LandDocument {
  id: string;
  landId: string;
  documentUrl: string;
  fileName: string;
  isActive: boolean;
  replacedById?: string | null;
  createdAt: string;
}

export interface LandRegistration {
  id: string;
  ownerId: string;
  owner?: User;
  ownerName: string;
  latitude: number;
  longitude: number;
  squareMeters: number;
  landStatus: "PENDING" | "APPROVED" | "REJECTED";
  ownershipType: string;
  stateId: string;
  state?: any;
  purpose: string;
  titleType: string;
  address?: string | null;
  documents?: LandDocument[];
  createdAt: string;
}
