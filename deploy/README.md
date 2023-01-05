# deploy 

```bash
export FOLDER_ID=<id из облака>
terraform init
terraform apply 
bash accout_accsess.sh
yc container registry configure-docker
yc sls container create --name catobase-api-container --folder-id ${FOLDER_ID}
python3 backend/src/migration.py
bash backend/update.sh

```