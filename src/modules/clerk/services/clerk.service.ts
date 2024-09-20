import { ClerkClient, createClerkClient } from '@clerk/clerk-sdk-node';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CloudConfigService } from 'src/configs/cloud-config.service';
import { VaultSecretNames } from 'src/modules/vault/interfaces/vault.interface';

@Injectable()
export class ClerkConfigService implements OnModuleInit {
  private clerkClient: ClerkClient;

  constructor(private cloudConfigService: CloudConfigService) {}

  async onModuleInit() {
    this.clerkClient = await this.createClerkClientConfig();
  }

  async createClerkClientConfig() {
    const secretKey = (
      await this.cloudConfigService.getConfig(VaultSecretNames.CLERK_SECRET_KEY)
    )?.version?.value;
    const publishableKey = (
      await this.cloudConfigService.getConfig(
        VaultSecretNames.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      )
    )?.version?.value;

    const clerkClient = createClerkClient({
      secretKey: secretKey,
      publishableKey: publishableKey,
    });

    console.log('[createClerkClient] success');
    return clerkClient;
  }

  getClerkClient() {
    return this.clerkClient;
  }
}
