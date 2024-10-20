import axios from 'axios';
import toast from 'svelte-french-toast';

export function deleteTarget(id: number) {
    toast.promise(
        axios.delete(`/targets/${id}`)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return 'Target deleted successfully';
                } else {
                    throw new Error(`Failed to delete Target: ${response.statusText}`);
                }
            })
            .catch(error => {
                throw new Error(`Failed to delete Target: ${error?.response?.data?.message || error.message}`);
            }),
        {
            loading: 'Deleting Target...',
            success: 'Target deleted successfully',
            error: (error) => `Failed to delete Target: ${error.message}`
        },
        { position: 'bottom-center' }
    );
}

export function createTarget(name: string, url: string) {
    toast.promise(
        axios.post(`/targets`, { name, url })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return 'Target created successfully';
                } else {
                    throw new Error(response.statusText);
                }
            })
            .catch(error => {
                throw new Error(error?.response?.data?.message || error.message);
            }),
        {
            loading: 'Creating Target...',
            success: 'Target created successfully',
            error: (error) => `Failed to create Target: ${error.message}`
        },
        { position: 'bottom-center' }
    );
}