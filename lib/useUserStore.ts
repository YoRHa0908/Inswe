"use client";

import { useState, useEffect } from "react";

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
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount / email change
  useEffect(() => {
    if (!email) return;
    try {
      const stored = localStorage.getItem(storageKey(email));
      if (stored) setProfile(JSON.parse(stored));
      else setProfile(defaultProfile);
    } catch {
      setProfile(defaultProfile);
    }
    setHydrated(true);
  }, [email]);

  // Persist whenever profile changes
  useEffect(() => {
    if (!hydrated || !email) return;
    try {
      localStorage.setItem(storageKey(email), JSON.stringify(profile));
    } catch {}
  }, [profile, hydrated, email]);

  const saveName = (firstName: string, lastName: string) => {
    setProfile((prev) => ({ ...prev, firstName, lastName }));
  };

  const addAddress = (addr: Omit<SavedAddress, "id">) => {
    const newAddr: SavedAddress = { ...addr, id: Date.now().toString() };
    setProfile((prev) => {
      const updated = addr.isDefault
        ? prev.addresses.map((a) => ({ ...a, isDefault: false }))
        : prev.addresses.length === 0
        ? []
        : prev.addresses;
      const isFirst = prev.addresses.length === 0;
      return {
        ...prev,
        addresses: [...updated, { ...newAddr, isDefault: isFirst || addr.isDefault }],
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
