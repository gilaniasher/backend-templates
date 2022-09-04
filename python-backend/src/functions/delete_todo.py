from src.utils.package import package
from src.utils.dynamodb_utils import todosTableName, ddb_client

def handler(event, context):
    id = event['pathParameters']['id']

    response = ddb_client.delete_item(
        TableName=todosTableName,
        Key={'todosId': {'S': id}}
    )

    return package(200, response)
