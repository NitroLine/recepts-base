npm install
npm version patch
npm run build
s3cmd sync build/ s3://${RECEIPT_WEBSITE_BUCKET}
s3cmd --recursive modify --add-header=content-type:application/javascript  s3://${RECEIPT_WEBSITE_BUCKET}/static/js/
s3cmd --recursive modify --add-header=content-type:text/css  s3://${RECEIPT_WEBSITE_BUCKET}/static/css/

