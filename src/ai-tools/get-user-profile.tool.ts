import { tool } from "ai";
import * as z from "zod";

export const get_user_details = tool({
    description: 'This tool fetches the profile details of the current user',
    inputSchema: z.object({
        accessor: z.record(z.string(), z.any()).describe('Contains accessor object')
    }),
    execute: async ({ accessor }: { accessor: any }) => {
        console.info('getting user details', accessor)
        return null
    }

})