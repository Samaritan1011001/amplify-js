// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { StorageAccessLevel } from '@aws-amplify/core';
import { AWSCredentials } from '@aws-amplify/core/internals/utils';

import { TransferProgressEvent } from '../../../types';
import {
	StorageListAllOptions,
	StorageListPaginateOptions,
} from '../../../types/options';

interface CommonOptions {
	/**
	 * Whether to use accelerate endpoint.
	 * @default false
	 */
	useAccelerateEndpoint?: boolean;
}

/** @deprecated This will be removed in next major version. */
type ReadOptions =
	| { accessLevel?: 'guest' | 'private' }
	| { accessLevel: 'protected'; targetIdentityId?: string };

/** @deprecated This will be removed in next major version. */
interface WriteOptions {
	/** @deprecated This will be removed in next major version. */
	accessLevel?: StorageAccessLevel;
}

interface BytesRangeOptions {
	bytesRange?: {
		start: number;
		end: number;
	};
}

/**
 * Transfer-related options type for S3 downloadData, uploadData APIs.
 */
interface TransferOptions {
	/**
	 * Callback function tracking the upload/download progress.
	 */
	onProgress?(event: TransferProgressEvent): void;
}

/**
 * Input options type for S3 getProperties API.
 */
export type GetPropertiesOptions = ReadOptions & CommonOptions;

/**
 * Input options type for S3 getProperties API.
 */
export type RemoveOptions = WriteOptions & CommonOptions;

/**
 * Input options type for S3 list API to list all items for a prefix.
 */
export type ListAllOptionsPrefix = StorageListAllOptions &
	ReadOptions &
	CommonOptions;

/**
 * Input options type for S3 list API to paginate items for a prefix.
 */
export type ListPaginateOptionsPrefix = StorageListPaginateOptions &
	ReadOptions &
	CommonOptions;

/**
 * Input options type for S3 list API to list all items for a path.
 */
export type ListAllOptionsPath = Omit<StorageListAllOptions, 'accessLevel'> &
	CommonOptions;

/**
 * Input options type for S3 list API to paginate items for a path.
 */
export type ListPaginateOptionsPath = Omit<
	StorageListPaginateOptions,
	'accessLevel'
> &
	CommonOptions;

/**
 * Input options type for S3 getUrl API.
 */
export type GetUrlOptions = ReadOptions &
	CommonOptions & {
		/**
		 * Whether to head object to make sure the object existence before downloading.
		 * @default false
		 */
		validateObjectExistence?: boolean;
		/**
		 * Number of seconds till the URL expires.
		 * @default 900 (15 minutes)
		 */
		expiresIn?: number;
	};

/**
 * Input options type for S3 downloadData API.
 */
export type DownloadDataOptions = CommonOptions &
	TransferOptions &
	BytesRangeOptions;

/** @deprecated Use {@link DownloadDataOptionsPath} instead. */
export type DownloadDataOptionsKey = ReadOptions & DownloadDataOptions;
export type DownloadDataOptionsPath = DownloadDataOptions;

export type UploadDataOptions = WriteOptions &
	CommonOptions &
	TransferOptions & {
		/**
		 * The default content-disposition header value of the file when downloading it.
		 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
		 */
		contentDisposition?: string;
		/**
		 * The default content-encoding header value of the file when downloading it.
		 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding
		 */
		contentEncoding?: string;
		/**
		 * The default content-type header value of the file when downloading it.
		 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
		 */
		contentType?: string;
		/**
		 * The user-defined metadata for the object uploaded to S3.
		 * @see https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html#UserMetadata
		 */
		metadata?: Record<string, string>;
	};

export type CopySourceOptions = ReadOptions & {
	key: string;
};

export type CopyDestinationOptions = WriteOptions & {
	key: string;
};

/**
 * Internal only type for S3 API handlers' config parameter.
 *
 * @internal
 */
export interface ResolvedS3Config {
	region: string;
	credentials: AWSCredentials;
	customEndpoint?: string;
	forcePathStyle?: boolean;
	useAccelerateEndpoint?: boolean;
}
