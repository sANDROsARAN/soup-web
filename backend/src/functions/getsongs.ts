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
            const sas = generateBlobSASQueryParameters({
                containerName,
                blobName: blob.name,
                permissions: BlobSASPermissions.parse("r"),
                expiresOn: new Date(new Date().valueOf() + 3600 * 1000)
            }, creds).toString();

            const url = `https://${accountName}.blob.core.windows.net/${containerName}/${encodeURIComponent(blob.name)}?${sas}`;

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
