import boto3
import os

todosTableName = 'TodosTable'

if os.environ.get('IS_OFFLINE'):
    ddb_client = boto3.client('dynamodb', endpoint_url='http://localhost:8000') 
else:
    ddb_client = boto3.client('dynamodb') 
