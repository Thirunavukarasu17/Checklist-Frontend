export const fetchChecklistResults = async () => {
    const response = await fetch('http://localhost:5000/api/checklist');
    if (!response.ok) {
        throw new Error('Failed to fetch checklist results');
    }
    return response.json();
};
