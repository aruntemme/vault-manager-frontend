'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { VAULT_ABI, VAULT_ADDRESS } from '../abi';

export default function Home() {
  const [agentAddress, setAgentAddress] = useState('');
  const [amount, setAmount] = useState('');

  // --- WRITE HOOKS (Setting Allowance) ---
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // --- READ HOOK (Checking Allowance) ---
  const { data: allowanceData, refetch } = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: 'allowances',
    args: [agentAddress as `0x${string}`],
    query: {
      enabled: !!agentAddress && agentAddress.startsWith('0x'), // Only fetch if address is valid
      refetchInterval: 2000, // Auto-refresh every 2 seconds to catch the Bot in action
    },
  });

  const handleApprove = async () => {
    if (!agentAddress || !amount) return;
    writeContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'setAllowance',
      args: [agentAddress as `0x${string}`, parseUnits(amount, 18)],
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white font-sans">
      <div className="w-full p-6 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-blue-400">🏦 Vault Manager</h1>
        <ConnectButton />
      </div>

      <main className="flex flex-col items-center mt-20 w-full max-w-md gap-6">
        
        {/* CARD 1: WRITE ACTION */}
        <div className="w-full p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Set Allowance</h2>
          
          <div className="w-full mb-4">
            <label className="block text-sm text-gray-400 mb-2">Agent Address</label>
            <input
              type="text"
              placeholder="0x..."
              className="w-full p-3 bg-gray-900 rounded-lg border border-gray-600 focus:border-blue-500 outline-none"
              value={agentAddress}
              onChange={(e) => setAgentAddress(e.target.value)}
            />
          </div>

          <div className="w-full mb-6">
            <label className="block text-sm text-gray-400 mb-2">Amount (peUSDC)</label>
            <input
              type="number"
              placeholder="0.0"
              className="w-full p-3 bg-gray-900 rounded-lg border border-gray-600 focus:border-blue-500 outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            onClick={handleApprove}
            disabled={isPending || isConfirming}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all 
              ${isPending || isConfirming ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            {isPending ? 'Check Wallet...' : isConfirming ? 'Confirming...' : 'Approve Agent'}
          </button>

          {isSuccess && <div className="mt-4 text-green-400 text-center text-sm">✅ Transaction Sent!</div>}
        </div>

        {/* CARD 2: LIVE DATA (THE NEW PART) */}
        <div className="w-full p-6 bg-gray-800/50 rounded-2xl border border-gray-700 backdrop-blur-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Live Blockchain Data</h3>
          
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-500">Current Allowance for this Agent:</p>
              <p className="text-3xl font-mono text-white mt-1">
                {allowanceData ? formatUnits(allowanceData as bigint, 18) : '0'} 
                <span className="text-sm text-gray-500 ml-2">peUSDC</span>
              </p>
            </div>
            
            <button onClick={() => refetch()} className="text-xs text-blue-400 hover:text-blue-300 underline">
              Refresh
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}