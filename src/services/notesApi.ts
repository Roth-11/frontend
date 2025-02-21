import api from './noteService';
import { AxiosError } from 'axios';  // Import AxiosError for more specific error handling

// Helper function to log and throw errors with more details
const handleApiError = (error: unknown) => {
    if (error instanceof AxiosError) {
        // Log the full error for debugging
        console.error('API error response:', error.response);
        console.error('API error message:', error.message);

        // Optionally, you could show a user-friendly message or return the error response message
        if (error.response) {
            return new Error(`API Error: ${error.response?.data?.message || error.message}`);
        } else {
            return new Error(`Network error: ${error.message}`);
        }
    } else {
        return new Error('An unknown error occurred');
    }
};

export const getNotes = async () => {
    try {
        const response = await api.get('/Notes');
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const getNoteById = async (id: number) => {
    try {
        const response = await api.get(`/Notes/${id}`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const createNote = async (note: any) => {
  try {
    const response = await api.post('/Notes', note);
    return response.data;  // Make sure response.data contains the expected structure.
  } catch (error) {
    throw error instanceof AxiosError ? error : new Error('Failed to create note');
  }
};

export const updateNote = async (id: number, note: any) => {
    try {
        const response = await api.put(`/Notes/${id}`, note);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const deleteNote = async (id: number) => {
    try {
        await api.delete(`/Notes/${id}`);
    } catch (error) {
        throw handleApiError(error);
    }
};
