# Favicon Generation Instructions

## Required Favicon Files

To complete the favicon setup, you need to generate the following files from your existing `public/logo.jpg`:

### Files to Generate:
1. `favicon.ico` - 16x16, 32x32, 48x48 multi-size ICO file
2. `favicon-16x16.png` - 16x16 PNG
3. `favicon-32x32.png` - 32x32 PNG  
4. `apple-touch-icon.png` - 180x180 PNG for iOS
5. `android-chrome-192x192.png` - 192x192 PNG for Android
6. `android-chrome-512x512.png` - 512x512 PNG for Android
7. `mstile-150x150.png` - 150x150 PNG for Windows tiles
8. `safari-pinned-tab.svg` - Monochrome SVG for Safari

## How to Generate:

### Option 1: Online Generator (Recommended)
1. Go to https://realfavicongenerator.net/
2. Upload your `public/logo.jpg` file
3. Configure settings:
   - iOS: Use your logo with white background
   - Android: Use your logo with white background  
   - Windows: Use theme color `#1e3a8a` (dark blue)
   - Safari: Create monochrome version of your logo
4. Download the generated package
5. Replace the placeholder files in your `public/` folder

### Option 2: Manual Creation
Use image editing software to create each size from your logo:
- Maintain the logo's red and blue color scheme
- Use white background for most icons
- Ensure the logo remains recognizable at small sizes (16x16)

### Option 3: Use a Favicon Generator Tool
Tools like Favicon.io or other favicon generators can batch create all sizes from a single image.

## Verification
After adding the files, you can verify they work by:
1. Checking browser tabs show your favicon
2. Adding to mobile home screen shows your icon
3. Using online favicon checkers

## Color Scheme Used
- Primary: `#1e3a8a` (dark blue)
- Background: `#ffffff` (white)
- Your logo colors (red/blue from the "P" logo)