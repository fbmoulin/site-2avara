import { useState, useCallback } from 'react';

export interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
}

interface UseApiRequestOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApiRequest<T>(options: UseApiRequestOptions = {}) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      isSuccess: false,
    });
  }, []);

  const execute = useCallback(async (
    url: string,
    requestOptions: RequestInit = {}
  ): Promise<T | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null, isSuccess: false }));

    try {
      const { headers: customHeaders, ...restOptions } = requestOptions;
      const mergedHeaders = {
        'Content-Type': 'application/json',
        ...(customHeaders as Record<string, string>),
      };
      
      const response = await fetch(url, {
        ...restOptions,
        headers: mergedHeaders,
      });

      const json: ApiResponse<T> = await response.json();

      if (!response.ok || !json.success) {
        const errorMessage = json.message || 'Erro ao processar requisição';
        setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
        options.onError?.(errorMessage);
        return null;
      }

      setState({
        data: json.data || null,
        isLoading: false,
        error: null,
        isSuccess: true,
      });

      options.onSuccess?.(json.data);
      return json.data || null;
    } catch (error) {
      const errorMessage = 'Erro de conexão. Verifique sua internet.';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      options.onError?.(errorMessage);
      return null;
    }
  }, [options]);

  const get = useCallback((url: string) => {
    return execute(url, { method: 'GET' });
  }, [execute]);

  const post = useCallback((url: string, body: unknown) => {
    return execute(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }, [execute]);

  const put = useCallback((url: string, body: unknown) => {
    return execute(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }, [execute]);

  const del = useCallback((url: string) => {
    return execute(url, { method: 'DELETE' });
  }, [execute]);

  return {
    ...state,
    execute,
    get,
    post,
    put,
    del,
    reset,
  };
}

export function useFetch<T>(url: string, options: UseApiRequestOptions = {}) {
  const api = useApiRequest<T>(options);

  const fetch = useCallback(() => {
    return api.get(url);
  }, [api, url]);

  return { ...api, fetch };
}

export function useMutation<T, B = unknown>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST',
  options: UseApiRequestOptions = {}
) {
  const api = useApiRequest<T>(options);

  const mutate = useCallback((body?: B) => {
    if (method === 'DELETE') {
      return api.del(url);
    }
    if (method === 'PUT') {
      return api.put(url, body);
    }
    return api.post(url, body);
  }, [api, url, method]);

  return { ...api, mutate };
}

export default useApiRequest;
