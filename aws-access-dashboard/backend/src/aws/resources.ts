import { LambdaClient, ListFunctionsCommand } from '@aws-sdk/client-lambda';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
import { CloudWatchLogsClient, DescribeLogGroupsCommand } from '@aws-sdk/client-cloudwatch-logs';
import { awsConfig, mockMode } from './client.js';
const mock={
  summary:{services:7,healthy:18,warnings:2,costEstimate:184.72},
  lambda:[{name:'orders-api',runtime:'nodejs22.x',status:'Active',updated:'8 min ago'},{name:'inventory-sync',runtime:'python3.13',status:'Active',updated:'1 hr ago'},{name:'billing-worker',runtime:'nodejs22.x',status:'Warning',updated:'3 hrs ago'}],
  s3:[{name:'company-frontend-prod',region:'ap-south-1',objects:'12.4K',access:'Private'},{name:'assets-cdn',region:'ap-south-1',objects:'84.1K',access:'CloudFront'},{name:'application-backups',region:'ap-south-1',objects:'1.8K',access:'Private'}],
  logs:[{name:'/aws/lambda/orders-api',storedBytes:18400000},{name:'/aws/lambda/inventory-sync',storedBytes:7200000},{name:'/ecs/api-production',storedBytes:48600000}]
};
export async function dashboardSummary(){return mock.summary;}
export async function listLambda(){if(mockMode())return mock.lambda; const c=new LambdaClient(await awsConfig()); const r=await c.send(new ListFunctionsCommand({MaxItems:50})); return (r.Functions||[]).map(x=>({name:x.FunctionName,runtime:x.Runtime,status:x.State,updated:x.LastModified}));}
export async function listS3(){if(mockMode())return mock.s3; const c=new S3Client(await awsConfig()); const r=await c.send(new ListBucketsCommand({})); return (r.Buckets||[]).map(x=>({name:x.Name,created:x.CreationDate,access:'Restricted'}));}
export async function listLogs(){if(mockMode())return mock.logs; const c=new CloudWatchLogsClient(await awsConfig()); const r=await c.send(new DescribeLogGroupsCommand({limit:50})); return (r.logGroups||[]).map(x=>({name:x.logGroupName,storedBytes:x.storedBytes}));}
