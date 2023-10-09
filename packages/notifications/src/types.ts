// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { InAppMessagingConfig } from './inAppMessaging/types';
import { PushNotificationConfig } from './pushNotifications/types';

export type NotificationsCategory = 'Notifications';

export type NotificationsSubCategory = 'InAppMessaging' | 'PushNotification';

export interface NotificationsProvider {
	// configure provider
	configure(config: object): object;

	// return category ('Notifications')
	getCategory(): NotificationsCategory;

	// return sub-category
	getSubCategory(): NotificationsSubCategory;

	// return the name of you provider
	getProviderName(): string;
}

export interface NotificationsConfig {
	Notifications?: {
		InAppMessaging?: InAppMessagingConfig;
		PushNotification?: PushNotificationConfig;
	};
}

export type UserInfo = {
	attributes?: Record<string, string[]>;
	demographic?: {
		appVersion?: string;
		locale?: string;
		make?: string;
		model?: string;
		modelVersion?: string;
		platform?: string;
		platformVersion?: string;
		timezone?: string;
	};
	location?: {
		city?: string;
		country?: string;
		latitude?: number;
		longitude?: number;
		postalCode?: string;
		region?: string;
	};
	metrics?: Record<string, number>;
};
