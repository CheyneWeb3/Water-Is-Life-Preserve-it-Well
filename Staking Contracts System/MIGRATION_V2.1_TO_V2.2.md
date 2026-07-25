# V2.1 -> V2.2

Removed lazy-only per-user economic rollover because it left global pool denominators stale.

V2.2 adds:

- UTC daily aggregate expiry buckets;
- first-interaction-per-new-epoch global rollover;
- exact boundary reward-per-token snapshots;
- lazy per-user settlement using those snapshots;
- maximum 31-epoch catch-up bound;
- irreversible emergency shutdown and direct vault principal exit;
- 24-hour adapter approval/revocation delay;
- multi-hop fixed Pancake V2 adapter routes;
- safe excess WATER recovery from the controller;
- expanded adversarial tests.
