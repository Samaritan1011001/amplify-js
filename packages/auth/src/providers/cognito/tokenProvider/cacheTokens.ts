// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { AmplifyError, decodeJWT } from '@aws-amplify/core';

import { tokenOrchestrator } from '.';

import { AuthenticationResultType } from '../utils/clients/CognitoIdentityProvider/types';
import { confirmDevice } from '../apis/confirmDevice';

export async function cacheCognitoTokens(
	AuthenticationResult: AuthenticationResultType
): Promise<void> {
	if (AuthenticationResult.AccessToken) {
		const accessToken = decodeJWT(AuthenticationResult.AccessToken);
		const accessTokenIssuedAtInMillis = (accessToken.payload.iat || 0) * 1000;
		const currentTime = new Date().getTime();
		const clockDrift =
			accessTokenIssuedAtInMillis > 0
				? accessTokenIssuedAtInMillis - currentTime
				: 0;
		let idToken;
		let refreshToken: string;
		let NewDeviceMetadata: string;

		if (AuthenticationResult.RefreshToken) {
			refreshToken = AuthenticationResult.RefreshToken;
		}
		if (AuthenticationResult.NewDeviceMetadata) {
			NewDeviceMetadata = JSON.stringify(
				AuthenticationResult.NewDeviceMetadata
			);
		}
		if (AuthenticationResult.IdToken) {
			idToken = decodeJWT(AuthenticationResult.IdToken);
		}

		await tokenOrchestrator.setTokens({
			tokens: {
				accessToken,
				idToken,
				refreshToken,
				NewDeviceMetadata,
				clockDrift,
			},
		});

		if (AuthenticationResult.NewDeviceMetadata) {
			confirmDevice(AuthenticationResult.NewDeviceMetadata);
		}
	} else {
		// This would be a service error
		throw new AmplifyError({
			message: 'Invalid tokens',
			name: 'InvalidTokens',
			recoverySuggestion: 'Check Cognito UserPool settings',
		});
	}
}
