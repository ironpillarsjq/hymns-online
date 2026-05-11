## REMOVED Requirements

### Requirement: Full-screen PDF rendering

**Reason**: PDF.js canvas-based rendering is replaced by native `<img>` rendering (`image-viewer` spec). The `pdfjs-dist` dependency SHALL be removed.

**Migration**: The `PdfRenderer.vue` component SHALL be deleted and replaced with `ImageRenderer.vue`, which uses `<img>` elements with CSS `object-fit: contain` instead of PDF.js canvas rendering. The `PdfViewerPage.vue` SHALL be renamed to `ViewerPage.vue` and updated to use the new renderer.

### Requirement: Keyboard navigation

**Reason**: Keyboard navigation functionality remains but is now covered by `image-viewer` spec with identical behavior.

**Migration**: No behavioral change. Keyboard handlers in `ViewerPage.vue` work identically — they simply call different methods on `ImageRenderer` instead of `PdfRenderer`.

### Requirement: Touch and swipe navigation

**Reason**: Touch navigation functionality remains but is now covered by `image-viewer` spec with identical behavior.

**Migration**: No behavioral change. Touch handlers in `ViewerPage.vue` work identically.

### Requirement: Page indicator overlay

**Reason**: Page indicator functionality remains identical. The "total pages" is now the number of images in the folder instead of PDF page count.

**Migration**: The `PageIndicator.vue` component requires no changes. The parent passes `currentPage` and `totalPages` props as before — only the source of `totalPages` changes from `pdfDoc.numPages` to `images.length`.

### Requirement: Navigation controls

**Reason**: Navigation controls functionality remains identical.

**Migration**: `NavControls.vue` requires no changes. The prev/next/back events are handled by `ViewerPage.vue` which delegates image navigation instead of PDF navigation.

### Requirement: PDF loading states

**Reason**: Loading state handling remains but is now covered by `image-viewer` spec for image loading instead of PDF.js document loading.

**Migration**: The loading spinner and error display in `ViewerPage.vue` work identically. The `onLoaded` event now carries `{ numImages }` instead of `{ numPages }`. The `onError` event remains identical.
