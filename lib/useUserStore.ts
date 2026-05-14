"use client";

import { useState, useEffect, useRef } from "react";

export type SavedAddress = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  postcode: string;
  country: string;
  isDefault: boolean;
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  addresses: SavedAddress[];
};

const defaultProfile: UserProfile = {
  firstName: "",
  lastName: "",
  addresses: [],
};

function storageKey(email: string) {
  return `inswe_profile_${email}`;
}

export function useUserStore(email: string) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  // loadedEmail tracks which email we've successfully loaded data for.
  // We only persist when loadedEmail === email, preventing saves before load.
  const loadedEmailRef = useRef<string>("");

  // ── LOAD: whenever email becomes available or changes ──────────────────────
  useEffect(() => {
    if (!email) return;

    // Reset the loaded marker so persist won't fire until load completes
    loadedEmailRef.current = "";

    try {
      const stored = localStorage.getItem(storageKey(email));
      if (stored) {
        setProfile(JSON.parse(stored));
      } else {
        setProfile(defaultProfile);
      }
    } catch {
      setProfile(defaultProfile);
    }

    // Mark this email as loaded — persist effect can now safely save
    loadedEmailRef.current = email;
  }, [email]);

  // ── PERSIST: only when we've loaded for this exact email ──────────────────
  useEffect(() => {
    // Guard: only save if we've loaded data for the current email
    if (!email || loadedEmailRef.current !== email) return;
    try {
      localStorage.setItem(storageKey(email), JSON.stringify(profile));
    } catch {}
  }, [profile, email]);

  const saveName = (firstName: string, lastName: string) => {
    setProfile((prev) => ({ ...prev, firstName, lastName }));
  };

  const addAddress = (addr: Omit<SavedAddress, "id">) => {
    const newAddr: SavedAddress = { ...addr, id: Date.now().toString() };
    setProfile((prev) => {
      const isFirst = prev.addresses.length === 0;
      const cleared = addr.isDefault
        ? prev.addresses.map((a) => ({ ...a, isDefault: false }))
        : prev.addresses;
      return {
        ...prev,
        addresses: [...cleared, { ...newAddr, isDefault: isFirst || addr.isDefault }],
      };
    });
  };

  const updateAddress = (id: string, addr: Omit<SavedAddress, "id">) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) =>
        a.id === id
          ? { ...addr, id }
          : addr.isDefault
          ? { ...a, isDefault: false }
          : a
      ),
    }));
  };

  const removeAddress = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
    }));
  };

  return { profile, saveName, addAddress, updateAddress, removeAddress };
}
