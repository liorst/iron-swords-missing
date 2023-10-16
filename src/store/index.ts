import PersonData from "@/app/utils/types";
import { atom } from "jotai";

export const dataAtom = atom<PersonData[]>([]);
export const queryAtom = atom("");
export const loadingAtom = atom(false);
