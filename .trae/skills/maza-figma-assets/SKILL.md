---
name: "maza-figma-assets"
description: "Provides critical Figma links for Maza website assets. Invoke when retrieving icons, components, or building UI from Figma."
---

# Maza Figma Assets

This skill directs the agent to the correct Figma locations for retrieving icons and components when building the Maza website.

## Asset Locations

When implementing the UI, use the following specific Figma links to access the correct resources:

### Icons
For all SVG icons and graphical symbols:
- **Link**: [Maza Icons](https://www.figma.com/design/gIiRn5jlO1pwcQaP42Ti8G/Maza?node-id=59-1317&t=xYKf5kif2zQwgtHP-4)
- **Node ID**: `59-1317`

### Components
For reusable UI components (buttons, inputs, cards, etc.):
- **Primary Components**: [Maza Components 1](https://www.figma.com/design/gIiRn5jlO1pwcQaP42Ti8G/Maza?node-id=4-112&t=xYKf5kif2zQwgtHP-4)
  - **Node ID**: `4-112`
- **Secondary Components / Layouts**: [Maza Components 2](https://www.figma.com/design/gIiRn5jlO1pwcQaP42Ti8G/Maza?node-id=36-999&t=xYKf5kif2zQwgtHP-4)
  - **Node ID**: `36-999`

## Usage Instructions

1.  **Identify Requirement**: Determine if the task requires icons or specific UI components.
2.  **Select Source**: Choose the appropriate link from the list above.
3.  **MCP Access**: When using the Figma MCP tools (like `mcp_Figma_AI_Bridge_get_figma_data` or `mcp_Figma_AI_Bridge_download_figma_images`), use the provided `fileKey` (`gIiRn5jlO1pwcQaP42Ti8G`) and the specific `nodeId`s listed above to fetch the correct data.
