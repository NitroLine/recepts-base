#!/bin/bash

echo "`(cat version.json) | jq '.version = .version + 1'`"  > version.json;
backendVersion=$(jq -r '.version' version.json);
echo "App version: $backendVersion";
docker build -t ${RECEIPT_API_REPOSITORY_NAME}:0.0.$backendVersion . ;
docker push ${RECEIPT_API_REPOSITORY_NAME}:0.0.$backendVersion;
yc sls container revisions deploy \
	--folder-id ${FOLDER_ID} \
	--container-id ${RECEIPT_API_CONTAINER_ID} \
	--memory 512M \
	--cores 1 \
	--execution-timeout 6s \
	--concurrency 3 \
	--environment AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID},AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY},DOCUMENT_API_ENDPOINT=${DOCUMENT_API_ENDPOINT},APP_VERSION=$backendVersion \
	--service-account-id ${API_SA_ID} \
	--image "${RECEIPT_API_REPOSITORY_NAME}:0.$backendVersion";


