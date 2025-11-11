import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } from "@azure/storage-blob";

const accountName = "soupwebstore92905"; // your storage account
const accountKey = process.env.AZURE_STORAGE_KEY; // we'll set this in local.settings.json
const containerName = "songs";

app.http('getsongs', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

        const creds = new StorageSharedKeyCredential(accountName, accountKey);
        const blobService = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net`,
            creds
        );

        const containerClient = blobService.getContainerClient(containerName);

        const items: Array<{ name: string, url: string }> = [];

        for await (const blob of containerClient.listBlobsFlat()) {

            // generate a SAS URL (valid for 1 hour)
            const now = new Date();
            const startsOn = new Date(now.getTime() - 10 * 60 * 1000); // 10 min buffer
            const expiresOn = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour
            console.log("UTC time now:", new Date().toISOString());


            // Make sure these are UTC timestamps
            const sas = generateBlobSASQueryParameters({
                containerName,
                blobName: blob.name,
                permissions: BlobSASPermissions.parse("r"),
                startsOn,
                expiresOn
            }, creds).toString();

            const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blob.name}?${sas}`;

            items.push({ name: blob.name, url });
        }

        return {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
            body: JSON.stringify(items),
        };
    }
});
