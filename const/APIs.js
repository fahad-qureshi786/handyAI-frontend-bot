export const BASE_URL_BACKEND = process.env.BASE_URL_BACKEND
export const APIs = {
    ADMIN: {
        GET_SYSTEM_PROMPT: '',
        UPDATE_SYSTEM_PROMPT: '',
        GET_ALL_CONVERSATIONS: '',
        FILTER_CONVERSATIONS_USING_SESSION_ID: '',
        GET_UNIQUE_SESSIONS: '',
    },
    USERS: {
        GENERATE_SESSION: `${BASE_URL_BACKEND}/api/handyAI/generateSession`,
        ASK_QUERY: `${BASE_URL_BACKEND}/api/handyAI/askQuery`,
    }
}
