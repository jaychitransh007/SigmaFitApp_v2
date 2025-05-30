import { Platform } from 'react-native';

const API_BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5050/api' 
  : 'http://localhost:5050/api';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function fetchAPI<T>(
  endpoint: string,
  method: RequestMethod = 'GET',
  body?: any,
  headers: Record<string, string> = {}
): Promise<{ data?: T; error?: string }> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include', // Important for cookies/sessions if using them
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        error: responseData.message || 'Something went wrong',
      };
    }

    return { data: responseData };
  } catch (error: unknown) {
    console.error('API call failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Network request failed';
    return {
      error: errorMessage,
    };
  }
}

// Auth API
export const authAPI = {
  requestOTP: (phoneNumber: string) =>
    fetchAPI<{ data: { userId: string; otp?: string } }>('/auth/request-otp', 'POST', { phoneNumber }),

  verifyOTP: (userId: string, otp: string) =>
    fetchAPI<{ 
      data: { 
        user: any; 
        token: string;
      };
    }>('/auth/verify-otp', 'POST', { userId, otp }),

  getCurrentUser: () =>
    fetchAPI<{ user: any }>('/auth/me', 'GET'),

  logout: () =>
    fetchAPI('/auth/logout', 'POST'),
};

export default {
  auth: authAPI,
};
