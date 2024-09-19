export const getApiURL = (relPath: string) =>
    `${process.env.NEXT_PUBLIC_API_URL}${relPath}`
