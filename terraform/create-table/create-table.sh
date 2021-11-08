curl \
  -H 'X-Amz-Target: DynamoDB_20120810.CreateTable' \
  -H "Authorization: Bearer $(yc iam create-token)" \
  -H "Content-Type: application.json" \
  -d @create.json $ENDPOINT