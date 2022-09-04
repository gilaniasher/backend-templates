from src.utils.package import package
from src.utils.dynamodb_utils import todosTableName, ddb_client
import json
from uuid import uuid4
from datetime import datetime

def handler(event, context):
    req_body = json.loads(event['body'])
    new_id = str(uuid4())

    todoItem = {
        'todosId': {'S': new_id},
        'title': {'S': req_body['title']},
        'description': {'S': req_body['description']},
        'createdAt': {'S': datetime.now().isoformat()},
        'status': {'BOOL': False}
    }

    response = ddb_client.put_item(TableName=todosTableName, Item=todoItem)
    return package(200, {'id': new_id, 'response': response})
