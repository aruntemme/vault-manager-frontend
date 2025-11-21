import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Web3 Grind App',
  projectId: 'YOUR_PROJECT_ID', // You can get one from cloud.walletconnect.com later, works without it for now
  chains: [baseSepolia],
  ssr: true,
});