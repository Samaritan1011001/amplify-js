// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { EventListener } from '../common';
import { UserInfo } from '../types';

import {
	NotificationsSubCategory,
	OnPushNotificationMessageHandler,
	OnTokenReceivedHandler,
	PushNotificationConfig,
	PushNotificationMessage,
	PushNotificationPermissions,
	PushNotificationPermissionStatus,
	PushNotificationProvider,
} from './types';

import { pushNotification } from './PushNotificationClass.native';

/**
 * Configure PushNotification
 * @param {Object} config - PushNotification configuration object
 */
function configure(
	config: PushNotificationConfig = {}
): PushNotificationConfig {
	return pushNotification.configure(config);
}

/**
 * Get the name of this module
 * @returns {string} name of this module
 */
function getModuleName(): NotificationsSubCategory {
	return 'PushNotification';
}

// /**
//  * Get a plugin from added plugins
//  * @param {string} providerName - the name of the plugin to get
//  */
// function getPluggable(providerName: string): PushNotificationProvider {
// 	return pushNotification.getPluggable(providerName);
// }

// /**
//  * Add plugin into PushNotification
//  * @param {PushNotificationProvider} pluggable - an instance of the plugin
//  */
// function addPluggable(pluggable: PushNotificationProvider): void {
// 	return pushNotification.addPluggable(pluggable);
// }

// /**
//  * Remove a plugin from added plugins
//  * @param {string} providerName - the name of the plugin to remove
//  */
// function removePluggable(providerName: string): void {
// 	return pushNotification.removePluggable(providerName);
// }

function enable(): void {
	return pushNotification.enable();
}

function identifyUser(userId: string, userInfo: UserInfo): Promise<void> {
	return pushNotification.identifyUser(userId, userInfo);
}

async function getLaunchNotification(): Promise<PushNotificationMessage | null> {
	return pushNotification.getLaunchNotification();
}

async function getBadgeCount(): Promise<number | null> {
	return pushNotification.getBadgeCount();
}

function setBadgeCount(count: number): void {
	return pushNotification.setBadgeCount(count);
}

async function getPermissionStatus(): Promise<PushNotificationPermissionStatus> {
	return pushNotification.getPermissionStatus();
}

async function requestPermissions(
	permissions: PushNotificationPermissions = {
		alert: true,
		badge: true,
		sound: true,
	}
): Promise<boolean> {
	return pushNotification.requestPermissions(permissions);
}

/**
 * Background notifications on will start the app (as a headless JS instance running on a background service on
 * Android) in the background. Handlers registered via `onNotificationReceivedInBackground` should return Promises if
 * it needs to be asynchronous (e.g. to perform some network requests). The app should run in the background as long
 * as there are handlers still running (however, if they run for more than 30 seconds on iOS, subsequent tasks could
 * get deprioritized!). If it is necessary for a handler to execute while the app is in quit state, it should be
 * registered in the application entry point (e.g. index.js) since the application will not fully mount in that case.
 *
 * @param handler a function to be run when a BACKGROUND_MESSAGE_RECEIVED event is received
 * @returns an event listener which should be removed when no longer needed
 */
function onNotificationReceivedInBackground(
	handler: OnPushNotificationMessageHandler
): EventListener<OnPushNotificationMessageHandler> {
	return pushNotification.onNotificationReceivedInBackground(handler);
}

function onNotificationReceivedInForeground(
	handler: OnPushNotificationMessageHandler
): EventListener<OnPushNotificationMessageHandler> {
	return pushNotification.onNotificationReceivedInForeground(handler);
}

function onNotificationOpened(
	handler: OnPushNotificationMessageHandler
): EventListener<OnPushNotificationMessageHandler> {
	return pushNotification.onNotificationOpened(handler);
}

function onTokenReceived(
	handler: OnTokenReceivedHandler
): EventListener<OnTokenReceivedHandler> {
	return pushNotification.onTokenReceived(handler);
}
