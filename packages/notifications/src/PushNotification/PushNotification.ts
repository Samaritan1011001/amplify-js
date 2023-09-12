// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

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

// export default class PushNotification implements PushNotificationInterface {
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

function enable(): void {
	throw new PlatformNotSupportedError();
}

function identifyUser(): Promise<void[]> {
	throw new PlatformNotSupportedError();
}

async function getLaunchNotification(): Promise<PushNotificationMessage> {
	throw new PlatformNotSupportedError();
}

async function getBadgeCount(): Promise<number | null> {
	throw new PlatformNotSupportedError();
}

function setBadgeCount(_: number): void {
	throw new PlatformNotSupportedError();
}

async function getPermissionStatus(): Promise<PushNotificationPermissionStatus> {
	throw new PlatformNotSupportedError();
}

async function requestPermissions(
	_?: PushNotificationPermissions
): Promise<boolean> {
	throw new PlatformNotSupportedError();
}

function onNotificationReceivedInBackground(
	_: OnPushNotificationMessageHandler
): any {
	throw new PlatformNotSupportedError();
}

function onNotificationReceivedInForeground(
	_: OnPushNotificationMessageHandler
): any {
	throw new PlatformNotSupportedError();
}

function onTokenReceived(_: OnTokenReceivedHandler): any {
	throw new PlatformNotSupportedError();
}

function onNotificationOpened(_: OnPushNotificationMessageHandler): any {
	throw new PlatformNotSupportedError();
}
// }
