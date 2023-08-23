// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { AmplifyV6, Platform, fetchAuthSession } from '@aws-amplify/core';
import { confirmDevice as confirmDeviceClient } from '../utils/clients/CognitoIdentityProvider';
import { AuthError } from '../../../errors/AuthError';
import { NewDeviceMetadataType } from '../utils/clients/CognitoIdentityProvider/types';
import { assertAuthTokens } from '../utils/types';
import {
	getRegion,
	getUserPoolName,
} from '../utils/clients/CognitoIdentityProvider/utils';
import AuthenticationHelper from '../utils/srp/AuthenticationHelper';
import { Buffer } from 'buffer';

export async function confirmDevice(
	newDeviceMetadata: NewDeviceMetadataType
): Promise<void> {
	if (!newDeviceMetadata.DeviceGroupKey || !newDeviceMetadata.DeviceKey) {
		throw new AuthError({
			name: 'InvalidNewDeviceMetadata',
			message:
				'DeviceGroupKey and DeviceKey not present in the device metadata.',
		});
	}
	const session = await fetchAuthSession({});
	assertAuthTokens(session.tokens);
	const userPoolId = AmplifyV6.getConfig().Auth?.userPoolId;
	const authenticationHelper = new AuthenticationHelper(
		getUserPoolName(userPoolId)
	);
	const region = getRegion(userPoolId);
	authenticationHelper.generateHashDevice(
		newDeviceMetadata.DeviceGroupKey,
		newDeviceMetadata.DeviceKey,
		async errGenHash => {
			if (errGenHash) {
				throw new AuthError({
					name: 'ErrorGeneratingDeviceHash',
					message: 'Error while creating a device hash.',
				});
			}

			const deviceSecretVerifierConfig = {
				Salt: Buffer.from(
					authenticationHelper.getSaltDevices(),
					'hex'
				).toString('base64'),
				PasswordVerifier: Buffer.from(
					authenticationHelper.getVerifierDevices(),
					'hex'
				).toString('base64'),
			};

			// TODO(V6): Remove? In V5, it's stored in class variable but not used anywhere
			const verifierDevices = deviceSecretVerifierConfig.PasswordVerifier;

			// TODO(V6): Confirm we need to give userAgent as DeviceName
			const isNavigatorAvailable = typeof navigator !== 'undefined';
			const userAgent = isNavigatorAvailable
				? Platform.isReactNative
					? 'react-native'
					: navigator.userAgent
				: 'nodejs';

			assertAuthTokens(session.tokens);
			const result = await confirmDeviceClient(
				{ region },
				{
					DeviceKey: newDeviceMetadata.DeviceKey,
					AccessToken: session.tokens!.accessToken.toString(),
					DeviceSecretVerifierConfig: deviceSecretVerifierConfig,
					DeviceName: userAgent,
				}
			);
			console.log('ConfirmDevice result: ', result);
			// TODO(V6): Cache deviceKey, deviceGroupKey and randomPassword
			const deviceGroupKey = newDeviceMetadata.DeviceGroupKey;
			const randomPassword = authenticationHelper.getRandomPassword();
			const deviceKey = newDeviceMetadata.DeviceKey;
			// if (result.UserConfirmationNecessary === true) {
			// 	return callback.onSuccess(
			// 		signInUserSession,
			// 		dataConfirm.UserConfirmationNecessary
			// 	);
			// }
		}
	);
}
