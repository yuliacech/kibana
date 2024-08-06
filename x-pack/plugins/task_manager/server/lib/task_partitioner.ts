/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { KibanaDiscoveryService } from '../kibana_discovery_service';
import { assignPodPartitions } from './assign_pod_partitions';

function range(start: number, end: number) {
  const nums: number[] = [];
  for (let i = start; i < end; ++i) {
    nums.push(i);
  }
  return nums;
}

export const MAX_PARTITIONS = 256;
export const CACHE_INTERVAL = 10000;

export class TaskPartitioner {
  private readonly allPartitions: number[];
  private readonly podName: string;
  private kibanaDiscoveryService: KibanaDiscoveryService;
  private podPartitions: number[];
  private podPartitionsLastUpdated: number;

  constructor(podName: string, kibanaDiscoveryService: KibanaDiscoveryService) {
    this.allPartitions = range(0, MAX_PARTITIONS);
    this.podName = podName;
    this.kibanaDiscoveryService = kibanaDiscoveryService;
    this.podPartitions = [];
    this.podPartitionsLastUpdated = Date.now() - CACHE_INTERVAL;
  }

  getAllPartitions(): number[] {
    return this.allPartitions;
  }

  getPodName(): string {
    return this.podName;
  }

  getPodPartitions(): number[] {
    return this.podPartitions;
  }

  async getPartitions(): Promise<number[]> {
    const lastUpdated = new Date(this.podPartitionsLastUpdated).getTime();
    const now = Date.now();

    // update the pod partitions cache after 10 seconds
    if (now - lastUpdated >= CACHE_INTERVAL) {
      try {
        const allPodNames = await this.getAllPodNames();
        this.podPartitions = assignPodPartitions(this.podName, allPodNames, this.allPartitions);
        this.podPartitionsLastUpdated = now;
      } catch (error) {
        // return the cached value
        return this.podPartitions;
      }
    }
    return this.podPartitions;
  }

  private async getAllPodNames(): Promise<string[]> {
    const nodes = await this.kibanaDiscoveryService.getActiveKibanaNodes();
    return nodes.map((node) => node.attributes.id);
  }
}
