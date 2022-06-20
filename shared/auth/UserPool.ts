import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { AWS_CONFIG } from './keys'

const poolData = {
  UserPoolId: AWS_CONFIG.cognito.userPoolId,
  ClientId: AWS_CONFIG.cognito.clientId,
}

export default new CognitoUserPool(poolData)
