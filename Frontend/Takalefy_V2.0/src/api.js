export const fetchData = async(url, options = {}) => {
    const { method = "GET", body = null } = options;
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
        const fetchOptions = { method, headers };
        if (method !== "GET" && body) fetchOptions.body = JSON.stringify(body);

        const response = await fetch(`https://api.takalefy.hs.vc${url}`, fetchOptions);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Request failed");
        }
        return await response.json();
    } catch (err) {
        throw err.message || "Unknown error";
    }
};