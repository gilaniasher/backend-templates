# Python Serverless Backend
This backend uses the Serverless framework to manage Lambda functions and DynamoDB tables. It supports:
* Local server for interacting with Lambdas and local DynamoDB
* Hot reloads (few seconds of delay)
* Code reuse across Lambdas
* Easy AWS deployments

## One Time Setup
> **Java Version**: Java 8 or higher is required to run DynamoDB locally.

```
nvm use                          # Node is needed to use Serverless
npm i                            # Packages needed for local dev
npx sls dynamodb install         # Will install local DynamoDB JARs

python3 -m venv .venv            # Create Python3 Virtual Env
source .venv/bin/activate
pip install -r requirements.txt  # Install Python libraries
```

## Running Locally

```
nvm use
source .venv/bin/activate

npm start                   # Locally host Lambdas/DynamoDB defined in serverless.yml
npm run view-table          # GUI for viewing local DynamoDB tables
```

## Adding Functions

Add a new Python file to the `functions` folder representing your new Lambda function.

In the `serverless-config/functions.yml` file, add your function's Serverless configuration by specifying handler path and HTTP verb.

## Adding Pip Libraries
```
source .venv/bin/activate
pip install -r requirements.txt

pip install numpy
pip freeze > requirements.txt
```

## Deploying
> **Docker**: Docker is required to properly package the Python libraries for deployments.

```
aws configure
npm run deploy
```
