// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export {
	enable,
	identifyUser,
	requestPermissions,
	getPermissionStatus,
	getLaunchNotification,
	onNotificationOpened,
	onNotificationReceivedInBackground,
	onNotificationReceivedInForeground,
	onTokenReceived,
	getBadgeCount,
	setBadgeCount,
} from './PushNotification';
export {
	PushNotificationEvent,
	PushNotificationMessage,
	PushNotificationPermissionStatus,
} from './types';
