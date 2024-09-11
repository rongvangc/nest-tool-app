import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { VaultSecrets } from '../interfaces/vault.interface';

@Injectable()
export class VaultConfigService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly generateUrl: string;
  private readonly readSecretsUrl: string;

  constructor(private configService: ConfigService) {
    this.clientId = this.configService.get<string>('HCP_CLIENT_ID');
    this.clientSecret = this.configService.get<string>('HCP_CLIENT_SECRET');
    this.generateUrl = this.configService.get<string>('HCP_GENERATE_URL');
    this.readSecretsUrl = this.configService.get<string>(
      'HCP_READ_SECRETS_URL',
    );
  }

  async getSecret(): Promise<any> {
    try {
      const response = await axios.post(
        this.generateUrl,
        new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials',
          audience: 'https://api.hashicorp.cloud',
        }),
      );

      return response.data.access_token;
    } catch (err) {
      console.error('Error fetching secret from Vault:', err);
      throw new Error('Could not fetch secret from Vault');
    }
  }

  async readSecrets(): Promise<VaultSecrets[]> {
    const token = await this.getSecret();

    try {
      const response = await axios.get(this.readSecretsUrl, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      const data = response?.data?.secrets;

      return data;
    } catch (error) {
      console.error('Error reading secret from Vault:', error);
      throw new Error('Could not reading secret from Vault');
    }
  }
}
