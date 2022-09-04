from src.utils.package import package
from src.utils.dynamodb_utils import todosTableName, ddb_client

def handler(event, context):
    todos_ddb = ddb_client.scan(TableName=todosTableName)
    return package(200, todos_ddb['Items'])
