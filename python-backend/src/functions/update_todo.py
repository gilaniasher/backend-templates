from src.utils.package import package
from src.utils.dynamodb_utils import todosTableName, ddb_client

def handler(event, context):
    id = event['pathParameters']['id']

    updated_todo = ddb_client.update_item(
        TableName=todosTableName,
        Key={'todosId': {'S': id}},
        UpdateExpression='set #status = :status',
        ExpressionAttributeNames={'#status': 'status'},
        ExpressionAttributeValues={':status': {'BOOL': True}},
        ReturnValues='ALL_NEW'
    )

    return package(200, updated_todo)
