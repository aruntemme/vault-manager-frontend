export const VAULT_ABI = [
    {
      inputs: [
        { internalType: "address", name: "_agent", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" }
      ],
      name: "setAllowance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [{ internalType: "address", name: "agent", type: "address" }],
      name: "allowances",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    }
  ] as const;
  
  // Your Day 2 Vault Address
  export const VAULT_ADDRESS = "0x9800eA3Fe980766a1E5bf6241068715774776eE0";