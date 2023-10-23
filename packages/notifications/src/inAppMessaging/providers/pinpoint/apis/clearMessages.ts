// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { defaultStorage } from '@aws-amplify/core';
import { STORAGE_KEY_SUFFIX, PINPOINT_KEY_PREFIX } from '../utils';

import {
	InAppMessagingValidationErrorCode,
	assertServiceError,
} from '../../../errors';
import { assertIsInitialized } from '../../../utils';

/**
 * Clear locally cached messages.
 *
 * @throws service exceptions - Thrown when the underlying Pinpoint service returns an error.
 * @throws validation: {@link InAppMessagingValidationErrorCode} - Thrown if In App messaging hasn't been initialized.
 * @returns A promise that will resolve when the operation is complete.
 * @example
 * ```ts
 * // Clear locally cached messages.
 * await clearMessages();
 *
 * ```
 */
export async function clearMessages(): Promise<void> {
	assertIsInitialized();
	try {
		const key = `${PINPOINT_KEY_PREFIX}${STORAGE_KEY_SUFFIX}`;
		return await defaultStorage.removeItem(key);
	} catch (error) {
		assertServiceError(error);
		throw error;
	}
}
