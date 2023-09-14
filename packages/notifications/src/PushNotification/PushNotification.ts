// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { UserInfo } from '../types';
import PlatformNotSupportedError from './PlatformNotSupportedError';
import {
	NotificationsSubCategory,
	OnPushNotificationMessageHandler,
	OnTokenReceivedHandler,
	PushNotificationConfig,
	PushNotificationInterface,
	PushNotificationMessage,
	PushNotificationPermissions,
	PushNotificationPermissionStatus,
	PushNotificationProvider,
} from './types';

/**
 * Configure PushNotification
 * @param {Object} config - PushNotification configuration object
 */
function configure(_: PushNotificationConfig = {}): PushNotificationConfig {
	throw new PlatformNotSupportedError();
}

/**
 * Get the name of this module
 * @returns {string} name of this module
 */
function getModuleName(): NotificationsSubCategory {
	throw new PlatformNotSupportedError();
}

// /**
//  * Get a plugin from added plugins
//  * @param {string} providerName - the name of the plugin to get
//  */
// function getPluggable(_: string) {
// 	throw new PlatformNotSupportedError();
// }

// /**
//  * Add plugin into PushNotification
//  * @param {PushNotificationProvider} pluggable - an instance of the plugin
//  */
// function addPluggable(_: PushNotificationProvider): void {
// 	throw new PlatformNotSupportedError();
// }

// /**
//  * Remove a plugin from added plugins
//  * @param {string} providerName - the name of the plugin to remove
//  */
// function removePluggable(): void {
// 	throw new PlatformNotSupportedError();
// }

export function enable(): void {
	throw new PlatformNotSupportedError();
}

export function identifyUser(
	userId: string,
	userInfo: UserInfo
): Promise<void[]> {
	throw new PlatformNotSupportedError();
}

export async function getLaunchNotification(): Promise<PushNotificationMessage> {
	throw new PlatformNotSupportedError();
}

export async function getBadgeCount(): Promise<number | null> {
	throw new PlatformNotSupportedError();
}

export function setBadgeCount(_: number): void {
	throw new PlatformNotSupportedError();
}

export async function getPermissionStatus(): Promise<PushNotificationPermissionStatus> {
	throw new PlatformNotSupportedError();
}

export async function requestPermissions(
	_?: PushNotificationPermissions
): Promise<boolean> {
	throw new PlatformNotSupportedError();
}

export function onNotificationReceivedInBackground(
	_: OnPushNotificationMessageHandler
): any {
	throw new PlatformNotSupportedError();
}

export function onNotificationReceivedInForeground(
	_: OnPushNotificationMessageHandler
): any {
	throw new PlatformNotSupportedError();
}

export function onTokenReceived(_: OnTokenReceivedHandler): any {
	throw new PlatformNotSupportedError();
}

export function onNotificationOpened(_: OnPushNotificationMessageHandler): any {
	throw new PlatformNotSupportedError();
}
