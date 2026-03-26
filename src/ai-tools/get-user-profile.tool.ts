import { tool } from "ai";
import { z } from "zod";

export const getUserDetails = tool({
    name: 'get-user-details',
    description: 'This tool fetches the profile details of the current user',
    inputSchema: z.object({
        accessor: z.object().describe('')
    }),
    execute: ({ accessor }) => {
        console.info('getting user details', accessor)
    }

})