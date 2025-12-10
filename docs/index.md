---
id: home
title: Home
sidebar_label: Home
---
# Home

Looking for ZWP repository? You can [view on GitHub here](https://github.com/zastrozzi/ZWP) or click on the badges below.

[![GitHub Repo](https://img.shields.io/badge/GitHub-ZWP-blue?logo=github)](https://github.com/zastrozzi/ZWP)

## Introduction

**ZWP** (or Zastrozzi Web Platform) is a next generation web application framework built upon Angular’s foundations. It is built in modern Typescript and is built as a monorepo using **@nrwl/nx**. 

**ZWP** is designed for creating browser applications, browser plugins, widgets, and progressive web apps. 

The platform includes common libraries for analytics, animations, auth, SQL-style querying of remote data sources, identity services, advanced layouts, privacy / GDPR, a complete Customer Data Platform, and connectors for financial service providers and UK government services.

## Packages
**ZWP** provides a number of packages for building web applications, organised into the following key domains:

### Core Platform
- [@zwp/platform.common - **Common Platform Utilities**](packages/platform/PLATFORM_COMMON.md)
- [@zwp/platform.analytics - **Google Analytics Integrations**](packages/platform/PLATFORM_ANALYTICS.md)
- [@zwp/platform.animations - **Advanced Browser Animations**](packages/platform/PLATFORM_ANIMATIONS.md)
- [@zwp/platform.auth - **Authentication/Authorisation Utilities**](packages/platform/PLATFORM_AUTH.md)
- [@zwp/platform.dynamic-query - **Dynamic SQL-style Queries**](packages/platform/PLATFORM_DYNAMIC_QUERY.md)
- [@zwp/platform.flows - **UX Journey Development**](packages/platform/PLATFORM_FLOWS.md)
- [@zwp/platform.google-cloud - **Google Cloud Integrations**](packages/platform/PLATFORM_GOOGLE_CLOUD.md)
- [@zwp/platform.identity - **Role-based User Identity Management**](packages/platform/PLATFORM_IDENTITY.md)
- [@zwp/platform.layout - **Core Application Layout System**](packages/platform/PLATFORM_LAYOUT.md)
- [@zwp/platform.privacy - **Privacy / GDPR / User Location Services**](packages/platform/PLATFORM_PRIVACY.md)

### Customer Data Platform
- [@zwp/cdp.common - **Customer Data Platform Core**](packages/cdp/CDP_COMMON.md)
- [@zwp/cdp.partner-net - **Third-Party Partner Integrations**](packages/cdp/CDP_PARTNER_NET.md)
- [@zwp/cdp.routing - **Customer Data Platform Routing**](packages/cdp/CDP_ROUTING.md)
- [@zwp/cdp.users - **User Management**](packages/cdp/CDP_USERS.md)

### Financial Services Network
- [@zwp/fsn.tink - **Tink Open Banking**](packages/fsn/FSN_TINK.md)
- [@zwp/fsn.mastercard - **Mastercard Integrations**](packages/fns/FNS_MASTERCARD.md)

### Rewards Network
- [@zwp/rewards-network.merchant-net - **Merchant Management**](packages/rewards-network/REWARDS_NETWORK_MERCHANT_NET.md)
- [@zwp/rewards-network.tillo - **Tillo Integrations**](packages/rewards-network/REWARDS_NETWORK_TILLO.md)

### Government Services
- [@zwp/ukgov.hmrc - **UK HMRC (Tax Office) Integrations**](packages/ukgov/UKGOV_HMRC.md)
