import { useRouter } from "next/router";
import { useMemo } from "react";
import { CreditTypes } from "types/creditTypes";

const parseCreditType = (type?: string | string[]) => {
  if (!type) {
    return undefined;
  }
  const expectedType = typeof type === "string" ? type : type[0];
  return Object.values(CreditTypes).find((id) => id === expectedType) ?? undefined;
};

const useCreditTypeParameter = () => {
  const router = useRouter();
  const creditType = useMemo(
    () => parseCreditType(router.query["credit_type"]) ?? CreditTypes.Cast,
    [router.query]
  );

  return creditType;
};

export default useCreditTypeParameter;
