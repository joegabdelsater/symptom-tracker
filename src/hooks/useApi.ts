import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useAuth } from "../contexts/auth";

export function useApi<TQueryKey extends [string, Record<string, unknown>?], TQueryFnData, TError, TData = TQueryFnData>(
    queryKey: TQueryKey,
    fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
        "queryKey" | "queryFn"
    >
) {
    const { getToken } = useAuth();

    const callback = async () => {
        const token = await getToken();
        return fetcher(queryKey[1], token ?? "");
    }
    return useQuery({
        queryKey,
        queryFn: callback,
        ...options
    });
}


export function useApiMutation<TData, TError, TVariables>(
    mutationFn: (variables: TVariables, token: string) => Promise<TData>,
    options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) {
    const { getToken } = useAuth();

    const mutation = async (variables: TVariables) => {
        const token = await getToken();
        return mutationFn(variables, token ?? '');
    };

    return useMutation(mutation, options);
}