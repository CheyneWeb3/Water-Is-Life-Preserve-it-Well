# Remix Deployment — V2.3

The `remix/` directory uses Solidity `0.8.19` and OpenZeppelin `4.5.0` imports pinned to the v4.5.0 GitHub tag.

Deploy `WaterStakingController` with:

1. `water_` — actual WATER token address.
2. `operator_` — server/automation wallet. Use zero address only when intentionally defaulting the deployer as operator in the canonical local-source constructor behavior.

Recommended production roles:

- Controller OWNER: multisig/high-security wallet.
- Controller OPERATOR: separate server hot wallet with only maintenance gas.

Do not fund mainnet reward reserves until actual WATER dividend behavior with clone vaults has been tested.
