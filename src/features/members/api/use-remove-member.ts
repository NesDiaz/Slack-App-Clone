import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = {
    id: Id<"members">;
};

type ResponseType = Id<"members"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useRemoveMember = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending" | null
  >(null);

  const mutation = useMutation(api.members.remove);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setStatus("pending");
        setError(null);
        setData(null);

        const response = await mutation(values);
        setData(response);
        setStatus("success");
        options?.onSuccess?.(response);
        return response;
      } catch (err) {
        const error = err as Error;
        setError(error);
        setStatus("error");
        options?.onError?.(error);
        if (options?.throwError) throw error;
      } finally {
        setStatus("settled");
        options?.onSettled?.();
      }
    },
    [mutation]
  );

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isError,
    isSettled,
  };
};
