# ZWP — Platform Privacy

Utilities and UI for privacy features used across ZWP applications: cookie banners, IP
location lookups, consent persistence and small privacy-related facades. The package exposes a
configurable `ZWPPrivacyModule` that apps should initialise with `forRoot(...)` to register
runtime behaviour, API providers and cookie banner appearance.

Package: `@zwp/platform.privacy`

## Purpose
- Provide cookie banner UI and cookie utilities to manage consent.
- Offer IP location lookup integrations with configurable providers (e.g. IPInfo).
- Expose NgRx state and facades for privacy-related state (cookie consent, ip-location).

## Typical usage (`forRoot` configuration)

Initialise the module in your application's root module using `ZWPPrivacyModule.forRoot(...)`.
Example below demonstrates enabling IP location lookups and a fully-configured cookie banner.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZWPPrivacyModule, ZWPPrivacyModuleIPLocationAPIProvider } from '@zwp/platform.privacy';

@NgModule({
	imports: [
		BrowserModule,
		ZWPPrivacyModule.forRoot({
			ipLocationEnabled: true,
			ipLocationAPIProvider: ZWPPrivacyModuleIPLocationAPIProvider.IP_INFO,
			ipInfoApiKey: 'xxxxxxxx',
			ipInfoDBApiKey: undefined,
			cookieBanner: {
				backgroundColor: 'secondary-system-background',
				title: 'Cookie Preferences',
				titleTextStyle: 'subheadline',
				titleTextColor: 'label',
				message: `
					This website uses and stores data such as cookies to enable essential site functionality, 
					as well as marketing, personalisation and analytics. You may change your settings at 
					any time or accept the default settings.
				`,
				messageTextStyle: 'caption2',
				messageTextColor: 'label',
				acceptButtonText: 'Allow All',
				acceptButtonTextStyle: 'button3',
				acceptButtonBackgroundColor: 'system-green',
				acceptButtonLabelColor: 'system-white',
				rejectButtonText: 'Deny All',
				rejectButtonTextStyle: 'button3',
				rejectButtonBackgroundColor: 'system-gray',
				rejectButtonLabelColor: 'system-white',
				saveButtonText: 'Save Selection',
				saveButtonTextStyle: 'button3',
				saveButtonBackgroundColor: 'system-teal',
				saveButtonLabelColor: 'system-white',
				categoryAllowToggleBackgroundColor: 'system-teal',
				categoryRejectToggleBackgroundColor: 'tertiary-system-fill',
				categoryAllowToggleLabelColor: 'system-white',
				categoryRejectToggleLabelColor: 'label',
			}
		})
	]
})
export class AppModule {}
```

Notes:
- `ipLocationAPIProvider` selects the upstream IP geolocation provider; check
	`src/lib/model/config/ip-location.api-provider.ts` for available providers.
- `cookieBanner` is an optional UI configuration object — the library supplies sensible
	defaults if fields are omitted.

## What this package exports (high level)
- Module: `zwp.privacy.module.ts` with `forRoot(...)` initialiser.
- State: privacy-related state under `src/lib/state/` (cookie consent, ip-location).
- Components: `cookie-banner.component.ts` and simpler UI building blocks under `src/lib/components/`.
- Services: `zwp.cookie.service.ts` and `zwp.ip-location.service.ts` for cookie management and
	IP lookup integrations.
- Models and config: `src/lib/model/config/` (cookie banner config, ip-location providers and tokens).

## Building

From the monorepo root run:

```bash
nx build platform.privacy
```

## Running unit tests

Run the package tests with:

```bash
nx test platform.privacy
```

Use `--watch` for iterative development:

```bash
nx test platform.privacy --watch
```

## Configuration details

The `forRoot` config object supports the following fields (see `src/lib/model/config/privacy-module.root.config.ts` for the canonical type):

- `ipLocationEnabled: boolean` — enable IP geolocation lookups.
- `ipLocationAPIProvider` — enum selecting the provider (e.g. `IP_INFO`).
- `ipInfoApiKey: string | undefined` — API key for IPInfo service where required.
- `ipInfoDBApiKey: string | undefined` — DB key variant if used by your integration.
- `cookieBanner` — object controlling cookie-banner appearance and text (title, message,
	button text and colours, toggle colours, etc.).

Defaults are applied for any missing cookie banner fields; supply only the values you need to
customise.

## Testing guidance
- For unit tests, prefer disabling IP lookups or swapping in a mocked `zwp.ip-location.service`.
- Test cookie behaviour against the `zwp.cookie.service.ts` and the `privacy.facade` rather
	than testing internal implementation details.

## Troubleshooting
- If the cookie banner does not appear, ensure `ZWPPrivacyModule.forRoot(...)` is registered in
	the root module and that the cookie service is not blocked by browser settings or extensions.
- If IP lookups fail, verify that `ipLocationAPIProvider` is correctly set and any required API
	keys are present.

## Contributing
- Add unit tests when changing facade behaviour, cookie parsing utilities or the cookie banner
	component.
- Document any new `forRoot` options in this README.

## License
Follow the repository license at the project root.
