import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock"

let bedrockClient: any = null

const clients: any = {}

export const getBedrockClient = (region: string, accessKeyId: string, secretAccessKey: string) => {
    // if (bedrockClient) return bedrockClient
    if (clients[accessKeyId]) return clients[accessKeyId]

    bedrockClient = createAmazonBedrock({
        region,
        accessKeyId,
        secretAccessKey,
    })

    return bedrockClient
}