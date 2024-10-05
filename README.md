# Built with Vue 3 + TypeScript + Vite

A detailed explanation of how this implementation achieves the aims:
1. Mockups and interfaces:
    * The implementation closely follows the described design, including a staggered grid layout for photos and a backdrop behind the search bar.
    * The first row of photos overlaps the backdrop, as specified in the requirements.
    * Author names and photo locations are displayed on each photo item.
2. Vue component lifecycle:
    * The onMounted hook is used in the main component to fetch initial photos when the component is mounted.
3. Handling API calls and responses using an API client:
    * Axios is used to make API calls to the Unsplash API.
    * Error handling is implemented for API calls.
4. CSS paradigms:
    * CSS Grid is used for the photo layout (display: grid).
5. Responsive design:
    * Media queries are used to adjust the layout for smaller screens.
    * The grid uses minmax and auto-fill for responsive behavior.
6. Clean component-based "non-hacky" SCSS:
    * Styles are scoped to each component.
    * SCSS nesting is used for clean and organized styles.
7. CSS animations and transitions:
    * Animations are used for the fade-in effect of photos and loading placeholders.
    * Transitions are applied to hover effects on photos.
--- Additional
    * A tint overlay is applied to the images to improve text contrast.
    * Loading placeholders are implemented to provide feedback while fetching data.
    * A modal is implemented to show a larger version of the image when clicked. (The design provided would only work for images with landscape orientations, so a little edit was added       so it works for images with portrait orientation.

