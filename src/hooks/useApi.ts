import { useQuery, UseQueryOptions,  } from "@tanstack/react-query";
import { useAuth } from "../contexts/auth";

export function useApi<TQueryKey extends [string, Record<string, unknown>?], TQueryFnData, TError, TData = TQueryFnData>(
    queryKey: TQueryKey,
    fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
        "queryKey" | "queryFn"
    >
) {
    const { token } = useAuth();

    const callback = async () => {
        return fetcher(queryKey[1], token ?? "");
    }
    return useQuery({
        queryKey,
        queryFn: callback,
        ...options
    });
}


