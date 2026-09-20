# Airtable Records OpenAPI Specification

## Project Overview

This is an unofficial OpenAPI project for the Airtable Records API.

Using Airtable’s official API Reference as the source for technical facts, I wrote an OpenAPI 3.1.1 specification for three Records API endpoints.

## Sources and Review Standards

I used the following Airtable pages as the main sources for technical facts:

- [Get record](https://airtable.com/developers/web/api/get-record)
- [Create records](https://airtable.com/developers/web/api/create-records)
- [Update record](https://airtable.com/developers/web/api/update-record)

I used the following resources to review the document structure and language:

- [OpenAPI Specification 3.1.1](https://spec.openapis.org/oas/v3.1.1.html)
- Tom Johnson’s [API documentation quality checklist](https://idratherbewriting.com/learnapidoc/docapis_quality_checklist.html)
- [Google Developer Documentation Style Guide](https://developers.google.com/style)

## Design Process

### 1. Reuse Repeated Structures

The first draft repeated some structures across endpoints. After review, I moved the shared content into reusable components and referenced it with `$ref`.

For example:

- Multiple responses use the `Record` schema;
- Multiple endpoints use `baseId`, `tableIdOrName`, and `recordId`;

This reduces repetition and helps keep field types and descriptions consistent across endpoints.

### 2. Describe Requests for One or More Records

The Create records endpoint supports two request body structures:

- To create one record, provide its field values in the `fields` property;
- To create multiple records, provide an array of records in the `records` property. Each record must include a `fields` property.

I used `oneOf` to represent these two structures and provided separate request and response examples for them.

## AI-assisted Review Workflow

I used Codex to review the OpenAPI specification. It helped me:

- Find repeated schemas, parameters, and examples;
- Check whether existing components could be reused with `$ref`;
- Compare schemas, examples, and descriptions;
- Find inconsistencies between request and response structures;
- Check whether the English descriptions were clear.

During the review, I checked technical facts against Airtable’s official API Reference and decided whether to accept each suggestion. I used Codex to support the review and analysis, not as an independent source for Airtable API.

## Tools Used

- **Swagger Editor**: Check the OpenAPI specification and confirm that it renders correctly.
- **Codex**: Find repeated content and check references.
- **Visual Studio Code**: Write and edit the YAML file.
- **Git**: Save the initial draft, later revisions, and final version so I could compare changes.
- **MkDocs**: Build the technical writing portfolio website.

## Verification

The specification renders in Swagger Editor without errors.
