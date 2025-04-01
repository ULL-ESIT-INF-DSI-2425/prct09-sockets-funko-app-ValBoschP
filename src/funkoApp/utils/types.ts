import { Funko } from "../models/FunkoPop.js";

export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  username: string;
  funkoPop?: Partial<Funko>; 
}

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list' | 'error';
  success: boolean;
  message?: string;
  funkoPops?: Funko[];
}