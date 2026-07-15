import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';
const region=process.env.AWS_REGION || 'ap-south-1';
export async function awsConfig(){
  const roleArn=process.env.AWS_ROLE_ARN;
  if(!roleArn) return {region};
  const sts=new STSClient({region});
  const out=await sts.send(new AssumeRoleCommand({RoleArn:roleArn,RoleSessionName:`dashboard-${Date.now()}`,DurationSeconds:900}));
  if(!out.Credentials) throw new Error('Unable to assume AWS role');
  return {region,credentials:{accessKeyId:out.Credentials.AccessKeyId!,secretAccessKey:out.Credentials.SecretAccessKey!,sessionToken:out.Credentials.SessionToken!}};
}
export const mockMode=()=>process.env.AWS_MOCK_MODE !== 'false';
