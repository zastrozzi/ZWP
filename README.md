# Zastrozzi Web Monorepo

This repository hosts multiple Angular applications and supporting libraries maintained by Zastrozzi. The workspace is managed with [Nx](https://nx.dev), which organizes all executables under the `apps/` directory and shared code under `packages/`.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Serve an application (replace `<app>` with one of the app names listed below):
   ```bash
   npx nx serve <app>
   ```
3. Build a project:
   ```bash
   npx nx build <project>
   ```
4. Run unit tests:
   ```bash
   npx nx test <project>
   ```
5. Lint a project:
   ```bash
   npx nx lint <project>
   ```

## Projects

| Project | Type | Description |
| --- | --- | --- |
| **cdp.common** | lib | Shared utilities for the Customer Data Platform |
| **cdp.partner-net** | lib | Partner network integration for CDP |
| **cdp.routing** | lib | Routing helpers for CDP modules |
| **cdp.users** | lib | User management for the CDP |
| **fsn.mastercard** | lib | Mastercard integration utilities |
| **fsn.tink** | lib | Tink integration utilities |
| **platform.analytics** | lib | Analytics helpers and Google integrations |
| **platform.animations** | lib | Animation utilities |
| **platform.auth** | lib | Authentication services |
| **platform.common** | lib | Common utilities shared across platforms |
| **platform.dynamic-query** | lib | Dynamic query building tools |
| **platform.flows** | lib | Flow management components |
| **platform.google-cloud** | lib | Google Cloud helpers |
| **platform.identity** | lib | Identity and access management utilities |
| **platform.layout** | lib | Layout and responsive design components |
| **platform.privacy** | lib | Privacy and consent modules |
| **rewards-network.merchant-net** | lib | Merchant integration for Rewards Network |
| **rewards-network.tillo** | lib | Tillo integration for Rewards Network |
| **template-lib** | lib | Template for creating new libraries |
| **ukgov.hmrc** | lib | HMRC integration utilities |

