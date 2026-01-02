"use client"

export interface ApiRequestOptions extends RequestInit {
	params?: Record<string, string | number | undefined>;
	revalidate?: number;
}

export class ApiClient {
	async get<T>(url: string, options: ApiRequestOptions = {}): Promise<T> {
		return this.request<T>(url, { ...options, method: "GET" });
	}

	async post<T>(url: string, body: unknown, options: ApiRequestOptions = {}): Promise<T> {
		return this.request<T>(url, {
			...options,
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
		});
	}

	private async request<T>(url: string, options: ApiRequestOptions): Promise<T> {
		const targetUrl = new URL(url);
		
		if (options.params) {
			Object.entries(options.params).forEach(([key, value]) => {
				if (value !== undefined) {
					targetUrl.searchParams.append(key, value.toString());
				}
			});
		}

		const fetchOptions: RequestInit = {
			...options,
			next: options.revalidate !== undefined ? { revalidate: options.revalidate } : (options as Record<string, unknown>).next as unknown,
		} as RequestInit;

		const response = await fetch(targetUrl.toString(), fetchOptions);

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			const error = new Error(`API Request failed: ${response.statusText}`) as Error & { status?: number; data?: unknown };
			error.status = response.status;
			error.data = errorData;
			throw error;
		}

		return response.json();
	}
}

export const apiClient = new ApiClient();
