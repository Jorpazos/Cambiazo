export type ListingType = "CAMBIO" | "VENDO" | "BUSCO";
export type ListingStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  province?: string;
  city?: string;
  isAdmin: boolean;
  verified: boolean;
  createdAt: string;
}

export interface Player {
  id: number;
  name: string;
  country: string;
  number: number;
  position?: string;
  image?: string;
  section?: string;
}

export interface Listing {
  id: number;
  type: ListingType;
  price?: number;
  description?: string;
  status: ListingStatus;
  createdAt: string;
  user: Pick<User, "id" | "name" | "province" | "city">;
  player: Player;
}

export interface StoreProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  type: string;
  image?: string;
  stock: number;
  active: boolean;
}

export interface JWTPayload {
  userId: number;
  email: string;
  isAdmin: boolean;
}
