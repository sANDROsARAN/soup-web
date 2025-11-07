import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";

const accountName = "soupwebstore92905"; // your storage account
const containerName = "songs";

app.http('getsongs', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

        const blobService = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net`
        );

        const containerClient = blobService.getContainerClient(containerName);

        const items: Array<{ name: string, url: string }> = [];

        for await (const blob of containerClient.listBlobsFlat()) {
            // public URL (no SAS token needed)
            const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blob.name}`;
            items.push({ name: blob.name, url });
        }

        return {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(items)
        };
    }
});
