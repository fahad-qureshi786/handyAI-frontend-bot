export const BASE_URL_BACKEND = process.env.BASE_URL_BACKEND
export const APIs = {
    ADMIN: {
        GET_SYSTEM_PROMPT: `${BASE_URL_BACKEND}/api/handyAI/admin/getSystemPrompts`,
        UPDATE_SYSTEM_PROMPT: `${BASE_URL_BACKEND}/api/handyAI/admin/updateSystemPrompt`,
        GET_ALL_CONVERSATIONS: `${BASE_URL_BACKEND}/api/handyAI/getAllChatDatabase`,
        FILTER_CONVERSATIONS_USING_SESSION_ID: `${BASE_URL_BACKEND}/api/handyAI/filterChatWithSession`,
        GET_UNIQUE_SESSIONS: `${BASE_URL_BACKEND}/api/handyAI/getUniqueSessionsCreated`,
    },
    USERS: {
        GENERATE_SESSION: `${BASE_URL_BACKEND}/api/handyAI/generateSession`,
        ASK_QUERY: `${BASE_URL_BACKEND}/api/handyAI/askQuery`,
    }
}
