import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import getRawBody from 'raw-body';
import { auth, resolver, protocol } from '@iden3/js-iden3-auth';
import path from 'path';

const rpcUrl =
	process.env.RPC_URL ||
	'https://polygon-amoy.g.alchemy.com/v2/ptMJ12-cPYKBpbpYYUNkeO2M2_AeQ1ho';
const stateContractAddress =
	process.env.STATE_CONTRACT_ADDRESS ||
	'0x7b3f7f8b0f3d0f9f3f8f8f8f8f8f8f8f8f8f8f8f8';

const AMOY_STATE_RESOLVER = new resolver.EthStateResolver(
	rpcUrl,
	stateContractAddress
);

const resolvers = {
	['polygon:amoy']: AMOY_STATE_RESOLVER,
};

// Temp Map
const requestMap = new Map();
const responseMap = new Map();

// PRIVADO FUNCTIONS

// getAuth
export const getAuth = async (req: any, res: any) => {
	try {
		const hostUrl = req.protocol + '://' + req.get('host');
		const sessionId = uuidv4();
		const callbackUrl = 'api/v1/callback-privado';
		const sender =
			'did:polygonid:polygon:amoy:QmVj4tNMwVqPJgd1T9ADX3ZTrd5Jrv3wNZWbJ6qN9XNDzp';
		const uri = `${hostUrl}/${callbackUrl}?sessionId=${sessionId}`;

		// Create a new auth request
		const authRequest = auth.createAuthorizationRequest(
			'polygon:amoy Test Auth',
			sender,
			uri
		);
		// console.log('authRequest', authRequest);
		const phone = [req.body.phone || '0727641393'];

		const proofRequest = {
			circuitId: 'credentialAtomicQuerySigV2',
			id: 1725717493,
			query: {
				allowedIssuers: ['*'],
				context: 'ipfs://QmVj4tNMwVqPJgd1T9ADX3ZTrd5Jrv3wNZWbJ6qN9XNDzp',
				type: 'humanInfo',
				credentialSubject: {
					phone: {
						$in: [`${phone}`],
					},
				},
			},
		};

		const scope = authRequest.body.scope ?? [];
		authRequest.body.scope = [...scope, proofRequest];

		// console.log({ authRequest, proofRequest });

		// Store the auth request
		requestMap.set(sessionId, authRequest);

		// Send the auth request to the user
		return { sessionId, uri, authRequest, proofRequest };
	} catch (error) {
		console.log('Privado Error:', error);
		return JSON.stringify(error);
	}
};

export const callbackPrivado = async (req: any, res: any) => {
	try {
		const sessionId = req.query.sessionId;

		if(!sessionId) {
			return 'No session id provided';
		}

		// get JWZ Token params
		const rawBody = await getRawBody(req);
		const jwzToken = rawBody.toString().trim();
		console.log('jwzToken', jwzToken);
		const authRequest = requestMap.get(sessionId);

		if (!authRequest) {
			return 'Not Authorized!';
		}
		// Verify the auth request
		const verifier = await auth.Verifier.newVerifier({
			stateResolver: resolvers,
			circuitsDir: path.join(__dirname, './circuits'),
		})

		let authResponse;
		try {
			const opts ={
				acceptedStateTransitionDelay: 3 * 60 * 1000, // 3 minutes
			},
			authResponse = await verifier.fullVerify(jwzToken, authRequest, opts);

			authResponse.body.message = jwzToken;

			//store the response in map
			responseMap.set(sessionId, authResponse);

			console.log('Auth Response', authResponse);

		}
		catch (error) {
		console.log('Auth Response Error:', error);
			return JSON.stringify(error);
		}
		return authResponse;
		console.log('Auth Response', authResponse);

		// Send the response to the user

	} catch (error) {
	console.log('Calback Privado Error:', error);
	return JSON.stringify(error);
}
}
