# capcon

Capcon is the capacity console for capacity team manage production capacity.

# Runbook

- Production URL: https://capacity.altus.vip.ebay.com
- Altus page: https://app.altus.vip.ebay.com/appdetails/22485
- CI: http://ebayci.qa.ebay.com/capcon-1612
- CD: https://ecd.stratus.qa.ebay.com/#/pipeline/152
- Consumer ID: urn:ebay-marketplace-consumerid:483872a1-21bc-46be-94db-80df10debc92

Current CICD is setup in following behavior:
Whenever master branch is updated, CI, then auto deploy to production site.

# TODO

- Setup a separate environment for QA.
- Create a release branch for production only release.
